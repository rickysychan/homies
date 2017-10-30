class Circle < ApplicationRecord
  has_many :circle_users
  has_many :posts
  has_many :users, through: :circle_users

  validates :name, presence: true
  validates :name, presence: true, uniqueness: { case_sensitive: false }
end
