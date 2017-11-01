class CreatePostComments < ActiveRecord::Migration[5.1]
  def change
    drop_table :post_comments, if_exists: true

    create_table :post_comments do |t|
      t.integer :user_id
      t.integer :post_id
      t.text :content

      t.timestamps
    end
  end
end
