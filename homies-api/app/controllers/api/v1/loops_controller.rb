module Api::V1
  class LoopsController < ApplicationController

    def create
      @loop = Loop.new(loop_params)
      @loop.save
      render json: @loop
    end

    def destroy
      @loop = Loop.where(article_id: params[:article_id], user_id: params[:user_id])
      @loop[0].destroy
      render json: @loop
    end

  end
end