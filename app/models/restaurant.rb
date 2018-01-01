class Restaurant < ActiveRecord::Base
  has_many :reviews
  has_many :restaurants, through: :reviews

  def reviews_average(value)
    reviews_ave = reviews.average(value) / 10 if reviews.present?
    return reviews_ave.round(1)
  end

end
