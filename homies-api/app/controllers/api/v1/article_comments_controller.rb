module Api::V1

  class ArticleCommentsController < ApplicationController

    def index
      @article_comments = ArticleComment.where(article_id: params[:article_id]).order(created_at: :desc)
      render json: @article_comments
    end

    def show
      @article_comment = ArticleComment.find params[:id]
      render json: @article_comment
    end

    def create
      @article_comment = ArticleComment.new(article_comment_params)
      @article_comment.save!
      render json: @article_comment
    end

    def destroy
      @article_comment = ArticleComment.find params[:id]
      @article_comment.destroy
    end


    private

    def article_comment_params
      params.require(:article_comment).permit(
        :article_id,
        :user_id,
        :content
      )
    end
  end
end
