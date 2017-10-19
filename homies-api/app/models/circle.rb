class Circle < ApplicationRecord
  has_many :circle_users
  has_many :posts
end
