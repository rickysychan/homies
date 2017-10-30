class CreateCircles < ActiveRecord::Migration[5.1]
  def change
    drop_table :circles, if_exists: true

    create_table :circles do |t|
      t.string :name

      t.timestamps
    end
  end
end
