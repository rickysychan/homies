class CreateArticles < ActiveRecord::Migration[5.1]
  def change
    create_table :articles do |t|
      t.text :article_url
      t.text :article_json

      t.timestamps
    end
  end
end
