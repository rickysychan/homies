class Post < ApplicationRecord
  belongs_to :user
  belongs_to :circle
  has_many :post_comments
end
