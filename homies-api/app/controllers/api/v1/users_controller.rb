module Api::V1

  class UsersController < ApplicationController

    def index
      @user = User.all
      render json: @user
    end


    def current
      puts 'this is the current user'
      puts current_user.inspect
      @user = current_user
      render json: @user
    end

    def circles
      @circles = User.find(params[:id]).circles
      render json: @circles
    end

    def show_circles
      @circles = User.find(params[:id]).circles
      render json: @circles
    end

    def articles
      # TODO: Use a current user here instead of User.first
      @user_articles_json = User.find(params[:id]).liked_articles.includes(:article_comments)
      # @user_articles_json = ArticleLike.where(user_id: params[:id]).as_json(include: :article_comments)
      # @user_articles_json = ArticleLike.where(user_id: params[:id]).as_json(include: {articles: { include: { article_comments: {only: [:user_id, :content]}}}})
      render json: @user_articles_json, include: :article_comments
    end

    def article_like
      @articles = ArticleLike.where(user_id: params[:id])
      render json: @articles
    end

    def product_interest
      @products = ProductInterest.where(user_id: params[:id])
      puts @products
      render json: @products
    end

    def loops
      @articles_json = User.find(params[:id]).articles.order(created_at: :asc)
      render json: @articles_json
    end


    private

    def user_params
      params.permit(
        :first_name,
        :last_name,
        :email,
        :password,
        :pic_link
        )
    end
  end
end
