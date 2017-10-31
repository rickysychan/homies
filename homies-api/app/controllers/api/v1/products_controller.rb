module Api::V1

  class ProductsController < ApplicationController
    def interest_number
      @users = ProductInterest.where(api_id: params[:product_id])
      render json: @users.length
    end

    def interest_create
      @product_interest = ProductInterest.new(api_id: params["api_id"],
        api_type: params["api_type"],
        user_id: params["user_id"])
      @product_interest.save
    end

    def interest_destroy
      @product_interest = ProductInterest.where("api_id = ? AND user_id = ?", params["api_id"], params["user_id"])
      @product_interest[0].destroy
    end

  end
end