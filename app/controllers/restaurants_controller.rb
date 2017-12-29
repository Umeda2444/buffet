class RestaurantsController < ApplicationController

  def index
  end

  def new
    @restaurant = Restaurant.new
  end


  def create
    Restaurant.create(create_params)
    redirect_to controller: :restaurants, action: :index
  end

  private
  def create_params
    params.require(:restaurant).permit(:restaurant_name, :category, :place, :holiday, :opening_hour, :tel)
  end

end
