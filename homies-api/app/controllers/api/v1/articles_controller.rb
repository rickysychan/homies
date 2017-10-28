module Api::V1
  class ArticlesController < ApplicationController

    def index
      @articles_json = Article.all.as_json(include: {article_likes: {only: :user_id}, article_comments: {only: [:user_id, :content]}})
      render json: @articles_json
    end

    def create
      @article = Article.new(article_params)
      @article.save
      render json: @article
    end

    def url_filter
      @article_url = Article.where(article_url: params[:url])
      render json: @article_url
    end


    def like_destroy
      @article_likes = ArticleLike.where(api_id: params[:article_id], user_id: session[:user_id])
      @article_likes.destroy

    end

    def like_create
      @article_likes = ArticleLike.new(article_like_params)
      @article_likes.save
    end

    def like_number
      @article_likes = ArticleLike.where(api_id: params[:article_id])
      render json: @article_likes.length
    end

    private

    def article_params
      puts params.inspect
      params.require(:article).permit(
        :article_url,
        article_json: {}
      )
    end

    def article_like_params
      params.require(:article_like).permit(
        :article_id,
        :user_id
      )
    end

  end
end