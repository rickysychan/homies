module Api::V1

    class CirclesController < ApplicationController
        respond_to :json

        def index
            @circles = Circle.all
            render json: @circles
        end

        def show
            @users = Circle.find(params[:id]).users
            render json: @users
        end

        def create
            @circle = Circle.new(circle_params)

            if @circle.save!
                circleID = @circle.id
                @found = Circle.find(circleID)
                @found.update(:moderator => current_user.id)
                @userCircle = CircleUser.create(circle_id: circleID, user_id: current_user.id)
                puts "this is the user circles"
                puts @userCircle.inspect

                render json: @circle
            else
                render status: 402
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


        def circle_params
            params.require(:circle).permit(
                :name
            )
        end
    end
end

