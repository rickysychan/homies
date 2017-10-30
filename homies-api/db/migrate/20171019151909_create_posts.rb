class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    drop_table :posts, if_exists: true

    create_table :posts do |t|
      t.integer :user_id
      t.integer :circle_id
      t.text :content

      t.timestamps
    end
  end
end
