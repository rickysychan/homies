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
      @recommendations = search_for_products(sort_results_by_number(submit_to_watson))
      render json: @recommendations
    end

    def product

    end

    private

    def tweet_search(product)
      @users = []
      results = @@client.search(product, result_type: "recent").take(20)
      results.each do |tweet|
        @users.push(tweet.user.id)
      end
      @users
    end

    def similar_users(product_array)
      @similar_users = []
      puts "Searching for users."
      product_array.each do |product|
        users = tweet_search(product)
        users.each { |user| @similar_users.push(user) }
      end
      @similar_users
    end

    def add_users_to_list(similar_users_array)
      puts "Creating list."
      list = @@client.create_list("Homies", options = { mode: 'private'})
      @list_id = list.id
      @@client.add_list_members(@list_id, similar_users_array)
      puts "Added members to list."
      @list_id
    end


    def similar_list_tweets(list_id)
      @similar_users_tweets = []
      puts "Searching list timeline."
      @@client.list_timeline(list_id, options = { :count => 50 }).each do |tweet|
        @similar_users_tweets.push(tweet.text)
      end
      puts "Destroying List"
      @@client.destroy_list(list_id)
      puts "Tweets: #{@similar_users_tweets.length}"
      @similar_users_tweets
    end


    def search_all(query)
      @results = []
      puts "Searching TV database."
      tv_search(query).each { |show| @results.push(show) }
      puts "Searching movie database."
      movie_search(query).each { |movie| @results.push(movie) }
      puts "Searching game database."
      game_search(query).each { |game| @results.push(game) }
      @results
    end

    def tv_search(show)
      shows = Tmdb::TV.find(show)
      puts "Results: #{shows.length}"
      shows
    end

    def movie_search(movie)
      movies = Tmdb::Movie.find(movie)
      puts "Results: #{movies.length}"
      movies
    end

    def game_search(game)
      games = GiantBomb::Search.new().query(game).resources('game').fetch
      puts "Results: #{games.length}"
      games
    end

    def twitter_user_products(body)
      @twitter_product_list = []
      puts "Extracting Tweet text."
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
        puts "Analyzing with Watson."
        @results = watson(@text)
        puts "Results: #{@results.length}"
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

    def search_for_products(product_hash)
      @search_results = []
      product_hash.keys.each do |key|
        results = search_all(key)
        results = results[0]
        @search_results.push(results) unless results.nil?
      end
      @search_results
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