Rails.application.routes.draw do
  root    'reviews#index'
  resources :reviews do
  end
end
