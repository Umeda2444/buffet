class AddImageUrlToRestsurants < ActiveRecord::Migration
  def change
    add_column :restaurants, :image_url, :text

  end
end
