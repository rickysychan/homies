module Api::V1

  class UsersController < ApplicationController
    def index
      @user = User.all
      render json: @user
    end
  end
end
