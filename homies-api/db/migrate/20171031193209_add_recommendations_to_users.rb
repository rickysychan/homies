class AddRecommendationsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :recommendations, :text
  end
end
