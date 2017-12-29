class RenameRestaurantNameColumnToRestaurants < ActiveRecord::Migration
  def change
    rename_column :restaurants, :restaurant_name, :name
  end
end
