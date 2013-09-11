TestProjectTwo::Application.routes.draw do

  resources :frogs, except: [:new, :edit] # New and Edit views are handled by Backbone
  resources :ballers

  root :to => 'frogs#main'
  get 'main' => 'frogs#main'

end
