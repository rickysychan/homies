class Article < ApplicationRecord
    has_many :article_comments
    has_many :article_likes

    has_many :article_users
    has_many :users, through: :article_users
end
