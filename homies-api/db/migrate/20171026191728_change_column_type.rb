class ChangeColumnType < ActiveRecord::Migration[5.1]
  def up
    change_column :articles, :article_json, :jsonb, using: 'CAST(article_json AS JSON)'
  end

  def down
    change_column :articles, :article_json, :text
  end
end

