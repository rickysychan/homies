class User < ApplicationRecord
  has_secure_password

  has_many :posts
  has_many :post_comments
  has_many :product_interests
  has_many :article_likes
  has_many :article_comments
  has_many :circle_users
  has_many :circles, through: :circle_users

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }


  # def self.authenticate_with_credentials(email, password)
  #   strippedEmail = email.strip
  #   emailToLowerCase = strippedEmail.downcase
  #   user = User.find_by_email(emailToLowerCase)
  #   if user && user.authenticate(password)
  #       user
  #   else
  #       nil
  #   end
  # end
end
