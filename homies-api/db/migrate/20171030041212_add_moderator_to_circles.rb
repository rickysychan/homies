class AddModeratorToCircles < ActiveRecord::Migration[5.1]
  def change
    add_column :circles, :moderator, :boolean

  end
end
