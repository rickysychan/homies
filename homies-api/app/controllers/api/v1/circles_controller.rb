module Api::V1

    class CirclesController < ApplicationController
        respond_to :json

        def index
            puts "CirclesController index"
            # puts current_user.inspect
            # @user = current_user.id
            # render json: @user
            @circles = CircleUser.all
            render json: @circles
        end

        def show
            @circle = Circle.find(params[:id])
            render json: @circle
        end

        def create
            @circle = Circle.new(circle_params)
            if @circle.save!
                render status: 200
            else
                render status: 500
            end
        end

        def update
            @circle = Circle.find(params[:id])
            @circle.update(name: params[:name])
        end

        def destroy
            @circle = Circle.find params[:id]
            @circle.destroy
        end

        def users
            @users = Circle.find(params[:circle_id]).users
            render json: @users
        end

        private

        def circle_params
            params.require(:circle).permit(
                :name
            )
        end
    end
end

