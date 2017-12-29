class ReviewsController < ApplicationController

  before_action :move_to_index,

  def new
    @restaurant = Restaurant.find params[:restaurant_id]
    @review = Review.new
  end

  def create
    Review.create(create_params)
    redirect_to controller: :restaurants, action: :index
  end

  private
  def create_params
    params.require(:review).permit(:mood, :temperature, :music, :design, :creanliness, :food, :umami, :amami, :sanmi, :siomi, :nigami, :service, :speed, :care, :value, :custom).merge(restaurant_id: params[:restaurant_id],user_id: current_user.id)
  end

  def move_to_index
    redirect_to controller: :restaurants,action: :index unless user_signed_in?
  end

end
