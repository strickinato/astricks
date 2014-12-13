Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :games, only: [:index, :create]
end
