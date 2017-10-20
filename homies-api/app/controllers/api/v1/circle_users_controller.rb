module Api::V1
    
    class CircleUsersController < ApplicationController

        def create
            @circleUser = CircleUser.new(circle_params)
            if @circleUser.save!
                render json: {status: "success"}, status: :successful
            else
                render json: {status: "error"}, status: :unprocessable_entity
            end
        end

        def index
            @circleUser = CircleUser.all
            render json: @circleUser
        end

        def destroy
            @circleUser = CircleUser.find params[:id]
            @circleUser.destroy
        end

    end
end