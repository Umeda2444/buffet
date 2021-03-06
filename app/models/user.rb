class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  validates :username, presence: true
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :reviews
  has_many :restaurants, through: :reviews

  def reviews_average(value)
    if reviews.present? then
      reviews_ave = reviews.average(value) / 10
      return reviews_ave.round(1)
    end
  end
end
