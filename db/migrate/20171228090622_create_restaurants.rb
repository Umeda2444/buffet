class CreateRestaurants < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
      t.string :restaurant_name
      t.string :category
      t.text   :place
      t.text   :holiday
      t.text   :opening_hour
      t.string :tel
      t.timestamps null: false
    end
  end
end
