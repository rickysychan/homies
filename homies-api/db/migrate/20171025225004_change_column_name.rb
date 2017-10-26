class ChangeColumnName < ActiveRecord::Migration[5.1]
  def change
    rename_column :article_comments, :api_id, :article_id
    rename_column :article_likes, :api_id, :article_id
  end
end
