class User < ApplicationRecord
  has_many :posts
  has_many :post_comments
  has_many :product_interests
  has_many :article_likes
  has_many :article_comments
  has_many :circle_users

  validates :name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :password, length: { minimum: 2 }
end
