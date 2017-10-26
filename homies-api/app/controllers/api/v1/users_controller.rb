module Api::V1

  class UsersController < ApplicationController

    def index
      @user = User.all
      render json: @user
    end

    def create
      user_params[:email] = user_params[:email].downcase!
      @user = User.new(user_params)
      puts "this is the user"
      puts @user

      if @user.save
        session[:user_id] = @user.id
        render :status => 200
      else
        render :status => 401
      end
    end

    def show
      @user = User.find(params[:id])
      render json: @user
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
