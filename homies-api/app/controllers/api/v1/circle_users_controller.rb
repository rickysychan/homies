module Api::V1

    class CircleUsersController < ApplicationController

        def create
            @userCircle = params[:search]
            @currentCircleId =  params[:circle_id]
            @searchTerm = @userCircle

            @user = User.find_by email: @searchTerm
            @searchResult = CircleUser.find_by_user_id_and_circle_id(@user.id, @currentCircleId)
            if @searchResult
                render status: 409
            else
            CircleUser.create(circle_id: @currentCircleId, user_id: @user.id)
            puts "this is the search result"
            puts @user
            render json: @user.first_name
        end
        end

        def index
            @circleUser = CircleUser.all
            render json: @circleUser
        end

        def show
            @circleUser = CircleUser.where(circle_id: params[:circle_id], user_id: params[:id])
            render json: @circleUser
        end

        def destroy
            @circleUser = CircleUser.find params[:id]
            @circleUser.destroy
        end

        def user_params
            params.require(:circle_user).permit(
                :user_id,
                :circle_id,
                :search
            )
        end

    end
end




    # def index
    #   @articles_json = Article.all.as_json(include: {article_likes: {only: :user_id}, article_comments: {only: [:user_id, :content]}})
    #   render json: @articles_json
    # end