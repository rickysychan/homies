module Api::V1
    
    class CirclesController < ApplicationController
        respond_to :json

        def show
            @circle = Circle.find(params[:id])
            render json: @circle
        end

        def create
            @circle = Circle.new(circle_params)
            if @circle.save!
                render json: {status: "success"}, status: :successful
            else
                render json: {status: "error"}, status: :unprocessable_entity
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

