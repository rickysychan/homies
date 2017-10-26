class Article < ApplicationRecord
    has_many :article_comments
    has_many :article_likes
end
