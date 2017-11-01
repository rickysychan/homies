class AddTitleToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :product_interests, :title, :string
  end
end
