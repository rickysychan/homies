class CircleUser < ApplicationRecord
  belongs_to :circles
  belongs_to :users
end
