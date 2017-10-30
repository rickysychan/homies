class User < ApplicationRecord
  has_secure_password

  has_many :posts
  has_many :post_comments
  has_many :product_interests
  has_many :article_likes
  has_many :article_comments
  has_many :circle_users
  has_many :circles, through: :circle_users

  has_many :article_users
  has_many :articles, through: :article_users

  has_many :commented_articles, through: :article_comments, source: :article
  has_many :liked_articles, through: :article_likes, source: :article

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }
end
