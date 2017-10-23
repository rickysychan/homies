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

      @body_text = "IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries."
        # "features": {
        #   "entities": {
        #     "emotion": true,
        #     "sentiment": true,
        #     "limit": 2
        #   },
        #   "keywords": {
        #     "emotion": true,
        #     "sentiment": true,
        #     "limit": 2
        #   }
        # }


       response = Excon.post("https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze",
         :body => @body_text,
         :headers => { "Content-Type"     => "text/plain",
                       "Content-Language" => "en",
                       "Accept-Language"  => "en" },
         :user => ENV["WATSON_USERNAME"],
         :password => ENV["WATSON_PASSWORD"],
         :query    => {
               "raw_scores"                => true,
               "consumption_preferences"   => true,
               "version"                   => "2017-02-27"
              }
       )

       response.body
    end

  end
end