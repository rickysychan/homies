module Api::V1

    class RegistrationsController < ApplicationController
      skip_before_action :authenticate_request

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