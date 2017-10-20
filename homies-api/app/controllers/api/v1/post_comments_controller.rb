module Api::V1

  class PostCommentsController < ApplicationController

    def index
      @post_comments = PostComment.where(post_id: params[:post_id])
      render json: @post_comments
    end

    def show
      @post_comments = PostComment.find params[:id]
      render json: @post_comments
    end

    def create
      @post_comments = PostComment.new(post_comment_params)
      @post_comments.save
    end

    def destroy
      @post_comments = PostComment.find params[:id]
      @post_comments.destroy
    end


    private

    def post_comment_params
      params.require(:post_comment).permit(
        :user_id,
        :post_id,
        :content
      )
    end

  end
end