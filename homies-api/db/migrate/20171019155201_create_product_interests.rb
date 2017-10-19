class CreateProductInterests < ActiveRecord::Migration[5.1]
  def change
    create_table :product_interests do |t|
      t.string :api_id
      t.string :api_type
      t.integer :user_id

      t.timestamps
    end
  end
end
