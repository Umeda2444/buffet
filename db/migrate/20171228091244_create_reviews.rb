class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.integer  :mood
      t.integer  :temperature
      t.integer  :music
      t.integer  :design
      t.integer  :creanliness
      t.integer  :food
      t.integer  :umami
      t.integer  :amami
      t.integer  :sanmi
      t.integer  :siomi
      t.integer  :nigami
      t.integer  :service
      t.integer  :speed
      t.integer  :care
      t.integer  :value
      t.integer  :custom
      t.string   :user_id
      t.string   :restaurant_id
      t.timestamps null: false
    end
  end
end
