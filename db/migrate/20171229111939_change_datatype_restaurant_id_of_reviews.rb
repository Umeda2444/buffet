class ChangeDatatypeRestaurantIdOfReviews < ActiveRecord::Migration
  def change
    change_column :reviews, :restaurant_id, :integer
  end
end
