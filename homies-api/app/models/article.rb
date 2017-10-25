class Article < ApplicationRecord
    has_many :article_comments
    has_many :artucke_likes
end
