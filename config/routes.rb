TestProjectTwo::Application.routes.draw do

  resources :frogs, except: [:new, :edit] # New and Edit views are handled by Backbone
  get 'frogs_search' => 'frogs#search'    # Recuires working Solr

  namespace :api do
    resources :ballers, except: [:new, :edit]
  end
  resources :ballers, only: [:index, :show, :new]

  root :to => 'ballers#index'
  get 'main' => 'frogs#main'

  get 'cube' => 'cube#index'

end
