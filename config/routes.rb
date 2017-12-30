Rails.application.routes.draw do
  devise_for :users
  resources :users, only: [:show]
  resources :restaurants do
    resources :reviews, only: [:new, :create]
  end
  root    'restaurants#index'

end
