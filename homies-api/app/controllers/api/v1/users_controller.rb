module Api::V1

  class UsersController < ApplicationController
    def index
      @user = User.all
      render json: @user
    end

    def create
      @user = User.new(user_params)

      if @user.save
        session[:user_id] = @user.id
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
      params.require(:user).permit(
        :first_name,
        :last_name,
        :email,
        :password_digest,
        :pic_link
        )
    end
  end
end
