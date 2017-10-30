module Api::V1

  class PostsController < ApplicationController
    before_action :validate_current_user

    def validate_current_user
      if !current_user
        render status: 401
      end
    end

    def index
      @posts = Post.all
      render json: @posts
    end

    def create
      if current_user
        # user is logged in
        @post = Post.new(
          user_id: current_user.id,
          circle_id: params[:circle_id],
          content: params[:post][:content]
          )
        @post.save
      else
        # respond with an error
      end
    end

    def show
      @post = Post.find(params[:id])
      render json: @post
    end

    def destroy
      @post = Post.find(params[:id])
      @post.destroy
    end

  end
end