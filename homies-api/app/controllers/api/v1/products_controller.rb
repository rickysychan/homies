module Api::V1

  class ProductsController < ApplicationController
    def interest_number
      @users = ProductInterest.where(api_id: params[:product_id])
      render json: @users.length
    end

    def interest_create
      @product_interest = ProductInterest.new(product_interest_params)
      @product_interest.save
    end

    def interest_destroy
      @product_interest = ProductInterest.where(api_id: params[:product_id], user_id: session[:user_id])
      @product_interest.destroy
    end

    private

    def product_interest_params
      params.require(:product_interest).permit(
        :api_id,
        :title,
        :api_type,
        :user_id
        )
    end
  end
end