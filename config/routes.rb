TestProjectTwo::Application.routes.draw do

  resources :frogs, except: [:new, :edit] # New and Edit views are handled by Backbone

  namespace :api do
    resources :ballers
  end
  resources :ballers

  root :to => 'frogs#main'
  get 'main' => 'frogs#main'

  get 'cube' => 'cube#index'

end
