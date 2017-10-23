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
      @recommendations = watson
      render json: @recommendations
    end

    private

    def top_three
      @@client.search("ghostbusters love", result_type: "recent").take(3).each do |tweet|
        tweet.text
      end
    end

    def fringe
      Tmdb::TV.find("fringe")
    end

    def need_for_speed
      GiantBomb::Search.new().query('Need for Speed').resources('game').fetch
    end

    def watson
       response = Excon.get("https://watson-api-explorer.mybluemix.net/natural-language-understanding/api/v1/analyze",
         :headers => { "Accept" => "application/json" },
         :query => { "version"        => "2017-02-27",
                     "text"           => "My next task was to take the JSON object this returned and format it into a hash with just the information I needed so I could use it to instantiate an object from another class using mass assignment. To do this I used the OpenStruct gem which made it easier to iterate through the data and pull out only what I needed. Plus, I had worked with hashes before but I had never used Ostruct, so it was another learning opportunity.",
                     "features"       => "categories",
                     "language"       => "en",
                     "concepts.limit" => 8,
                     "entities.limit" => 50,
                     "keywords.limit" => 50
                    },
         :user => ENV["WATSON_USERNAME"],
         :password => ENV["WATSON_PASSWORD"],
       )
       response.body
    end

  end
end