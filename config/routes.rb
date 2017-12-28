Rails.application.routes.draw do
  devise_for :users
  root    'reviews#index'
  resources :reviews do
  end
end
