class User < ApplicationRecord
  has_many :posts
  has_many :post_comments
  has_many :product_interests
  has_many :article_likes
  has_many :article_comments
  has_many :circle_users

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :password_digest, length: { minimum: 4 }
end
