class CircleUser < ApplicationRecord
  belongs_to :circle
  belongs_to :user, optional: true
end
