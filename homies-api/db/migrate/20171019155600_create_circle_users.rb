class CreateCircleUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :circle_users do |t|
      t.integer :circle_id
      t.integer :user_id
      t.boolean :moderator

      t.timestamps
    end
  end
end
