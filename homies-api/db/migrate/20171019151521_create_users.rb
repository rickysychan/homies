class CreateUsers < ActiveRecord::Migration[5.1]
  def up
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password_digest
      t.string :pic_link

      t.timestamps
    end
  end

  def down
    drop_table :users, if_exists: true
  end

end
