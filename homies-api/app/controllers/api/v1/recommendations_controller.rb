require 'twitter'
require 'themoviedb'

module Api::V1

  class RecommendationsController < ApplicationController
    Tmdb::Api.key(ENV["TMDB_KEY"])
    @@client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV["TWITTER_CONSUMER_KEY"]
      config.consumer_secret     = ENV["TWITTER_CONSUMER_SECRET"]
      config.access_token        = ENV["TWITTER_ACCESS_TOKEN"]
      config.access_token_secret = ENV["TWITTER_ACCESS_SECRET"]
    end


    def index
      @recommendations = fringe
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
  end
end
