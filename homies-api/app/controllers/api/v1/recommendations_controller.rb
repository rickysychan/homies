require 'twitter'

module Api::V1

  class RecommendationsController < ApplicationController
    @@client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV["TWITTER_CONSUMER_KEY"]
      config.consumer_secret     = ENV["TWITTER_CONSUMER_SECRET"]
      config.access_token        = ENV["TWITTER_ACCESS_TOKEN"]
      config.access_token_secret = ENV["TWITTER_ACCESS_SECRET"]
    end

    def index
      @recommendations = timeline
      render json: @recommendations
    end

    private

    def timeline
      @@client.search("to:justinbieber marry me", result_type: "recent").take(3).each do |tweet|
        tweet.text
      end
    end

  end
end
