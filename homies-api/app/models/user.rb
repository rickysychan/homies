class User < ApplicationRecord
  has_many :posts
  has_many :post_comments
  has_many :product_interests
  has_many :articles
  has_many :article_likes
  has_many :article_comments
  has_many :circle_users

  has_many :commented_articles, through: :article_comments, source: :article
  has_many :liked_articles, through: :article_likes, source: :article

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }
end
