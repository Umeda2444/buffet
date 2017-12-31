class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  validates :username, presence: true
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :reviews
  has_many :restaurants, through: :reviews

  def mood_average
    reviews.average(:mood).round(1) if reviews.present?
  end

  def food_average
    reviews.average(:food).round(1) if reviews.present?
  end

  def service_average
    reviews.average(:service).round(1) if reviews.present?
  end

end
