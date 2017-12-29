class RestaurantsController < ApplicationController

  before_action :move_to_index, except: :index

  def index
    @restaurant = Restaurant.where('name LIKE(?)', "%#{params[:keyword]}%").limit(20)
  end

  def new
    @restaurant = Restaurant.new
  end

  def create
    Restaurant.create(create_params)
    redirect_to controller: :restaurants, action: :index
  end

  def show
    @restaurant = Restaurant.find(params[:id])
  end




  private
  def create_params
    params.require(:restaurant).permit(:name, :category, :place, :holiday, :opening_hour, :tel)
  end

  def move_to_index
    redirect_to action: :index unless user_signed_in?
  end

end
