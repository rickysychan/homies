class RemoveModeratorFromCircleUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :circle_users, :moderator, :boolean
  end
end
