module Api::V1

  class PostsController < ApplicationController
    def index
      @posts = Post.all
      render json: @posts
    end

    def create
      @post = Post.new(
        user_id: session[:user_id],
        circle_id: params[:circle_id],
        content: params[:post][:content]
        )
      @post.save
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