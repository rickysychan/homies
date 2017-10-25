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
      @recommendations = twitter_user_products(watson("ign", "entities"))
      render json: @recommendations
    end

    def product

    end

    private

    def tweet_search(movie_name)
      @@client.search(movie_name, result_type: "recent").take(100).each do |tweet|
        tweet.text
      end
    end

    def list_of_tweets_text(tweets)
      @tweet_text = []
      tweets.each do |tweet|
        @tweet_text.push(tweet.text)
      end
      @tweet_text
    end

    def user_tweets(user_id)
      @@client.user_timeline(user_id, options = { :count => 200 })
    end

    def fringe
      Tmdb::TV.find("fringe")
    end

    def need_for_speed
      GiantBomb::Search.new().query('Need for Speed').resources('game').fetch
    end

    def twitter_user_products(body)
      parsed_body = JSON.parse(body)
      parsed_body["entities"].each do |product|
        puts product["text"]
      end
    end

    def watson(twitter_user, features)
       response = Excon.get("https://watson-api-explorer.mybluemix.net/natural-language-understanding/api/v1/analyze",
         :headers => { "Accept" => "application/json" },
         :query => { "version"        => "2017-02-27",
                     "url"           => "https://twitter.com/#{twitter_user}",
                     "features"       => features,
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