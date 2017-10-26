class ChangeColumnName < ActiveRecord::Migration[5.1]
  def up
    change_table :article_likes do |t|
      t.remove :api_id
      t.references :article
    end

    change_table :article_comments do |t|
      t.remove :api_id
      t.references :article
    end
  end

  def down
    change_table :article_likes do |t|
      t.remove :article_id
      t.string :api_id
    end

    change_table :article_comments do |t|
      t.remove :article_id
      t.string :api_id
    end
  end
end
