module Api::V1

    class CircleUsersController < ApplicationController

        def create
            @userCircle = params[:search]
            @searchTerm = @userCircle

            @user = User.find_by email: @searchTerm
            puts "this is the user found"
            puts @user.inspect
            CircleUser.create(circle_id: 3, user_id: @user.id)
        end

        def index
            @circleUser = CircleUser.all
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