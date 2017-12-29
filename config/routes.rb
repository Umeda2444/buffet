Rails.application.routes.draw do
  devise_for :users
  root    'restaurants#index'
  resources :restaurants do
    resources :reviews, only: [:new, :create]
  end
  resources :users, only: [:show]

end
