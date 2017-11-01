class AddArticleToPost < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :article, :jsonb
  end
end
