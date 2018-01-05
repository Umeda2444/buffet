class Restaurant < ActiveRecord::Base
  has_many :reviews
  has_many :restaurants, through: :reviews

  def reviews_average(value)
    if reviews.present? then
      reviews_ave = reviews.average(value) / 10
      return reviews_ave.round(1)
    end
  end

end
