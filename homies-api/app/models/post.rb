class Post < ApplicationRecord
  belongs_to :users
  belongs_to :circles
  has_many :post_comments
end
