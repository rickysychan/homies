require 'twitter'
require 'themoviedb'
require 'giantbomb-api'
require 'excon'
require 'rubygems'

module Api::V1

  class RecommendationsController < ApplicationController

    # API Setup

    Tmdb::Api.key(ENV["TMDB_KEY"])
    GiantBomb::Api.key(ENV["GIANT_BOMB_KEY"])
    @@client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV["TWITTER_CONSUMER_KEY"]
      config.consumer_secret     = ENV["TWITTER_CONSUMER_SECRET"]
      config.access_token        = ENV["TWITTER_ACCESS_TOKEN"]
      config.access_token_secret = ENV["TWITTER_ACCESS_SECRET"]
    end


    # Index

    def index
      @recommendations = sort_results_by_number(submit_to_watson)
      render json: @recommendations
    end

    def product

    end

    private

    def tweet_search(product)
      @users = []
      results = @@client.search(product, result_type: "recent").take(20)
      results.each do |tweet|
        @users.push(tweet["user"]["id"])
      end
      @users
    end

    def similar_users(product_array)
      @similar_users = []
      product_array.each do |product|
        users = tweet_search(product)
        users.each { |user| @similar_users.push(user) }
      end
      @similar_users
    end

    def add_users_to_list(similar_users_array)
      list = @@client.create_list("Homies", options = { mode: 'private'})
      @list_id = list["id"]
      @@client.add_list_members(@list_id, similar_users_array)
      @list_id
    end


    def similar_list_tweets(list_id)
      @similar_users_tweets = []
      @@client.list_timeline(list_id, options = { :count => 50 }).each do |tweet|
        @similar_users_tweets.push(tweet["text"])
      end
      @similar_users_tweets
    end


    def search_all(query)
      @results = []
      @results.push(tv_search(query))
      @results.push(movie_search(query))
      @results.push(game_search(query))
      @results
    end

    def tv_search(show)
      Tmdb::TV.find(show)
    end

    def movie_search(movie)
      Tmdb::Movie.find(movie)
    end

    def game_search(game)
      GiantBomb::Search.new().query(game).resources('game').fetch
    end

    def twitter_user_products(body)
      @twitter_product_list = []
      parsed_body = JSON.parse(body)
      parsed_body["entities"].each do |product|
        @twitter_product_list.push(product["text"])
      end
      @twitter_product_list
    end

    def return_similar_user_texts(products_array)
      @tweet_list = []
      while @tweet_list.empty? do
        sleep(5)
        @tweet_list = similar_list_tweets(add_users_to_list(similar_users(products_array)))
      end
      @tweet_list
    end

    def submit_to_watson
      @results = {}
      @text = return_similar_user_texts(["Big Fish", "Call of Duty", "Bob's Burgers", "Dante's Peak", "Ninja Turtles"]).to_s
      while @results.empty? do
        sleep(10)
        @results = watson(@text)
      end
      parsed_results = JSON.parse(@results)
      entities = parsed_results["entities"]
      entities.map! do |entity|
        entity["text"]
      end
      entities
    end

    def sort_results_by_number(array)
      results_hash = array.each_with_object(Hash.new(0)) { |o, h| h[o] += 1 }
      results_hash.sort_by(&:last).to_h
    end

    def watson(text)
       response = Excon.get("https://watson-api-explorer.mybluemix.net/natural-language-understanding/api/v1/analyze",
         :headers => { "Accept" => "application/json" },
         :query => { "version"        => "2017-02-27",
                     "text"           => text,
                     "features"       => "entities",
                     "language"       => "en",
                     "concepts.limit" => 8,
                     "entities.limit" => 50,
                     "entities.model" => "10:949c5dac-6522-4da6-9526-890c5983ff26"
                    },
         :user => ENV["WATSON_USERNAME"],
         :password => ENV["WATSON_PASSWORD"],
       )
      response.body
    end

  end
end