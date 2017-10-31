Rails.application.routes.draw do
  post 'authenticate', to: 'authentication#authenticate'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do

      resources :users, only: [:index, :create, :show]
        get '/users/current', to: 'users#current'
        get '/users/:id/articles', to: 'users#articles'
        get '/users/:id/article_likes', to: 'users#article_like'
        get '/users/:id/product_interests', to: 'users#product_interest'
        get '/users/:id/recommendations', to: 'recommendations#index'
        post '/users/login', to: 'sessions#create'
        get '/users/login', to: 'users#destroy'
        post '/users/registeration', to: 'registrations#create'
        get '/users/:id/circles', to: 'users#circles'
        get '/users/:id/loops', to: 'users#loops'



      resources :circles, only: [:create, :show, :update, :destroy, :index] do
        resources :circle_users, except: [:update]
        resources :posts, except: [:update] do
          resources :post_comments, except: [:update]
        end
      end

      scope '/products/:product_id', as: 'products' do
        get '/interests', to: 'products#interest_number'
        post '/interests', to: 'products#interest_create'
        delete '/interests', to: 'products#interest_destroy'
      end

      # scope '/articles/:article_id', as: 'articles' do
      #   resources :article_comments, except: [:update]
      #   get '/likes', to: 'articles#like_number'
      #   post '/likes', to: 'articles#like_create'
      #   delete '/likes', to: 'articles#like_destroy'
      # end

      resources :articles, only: [:index, :create] do
        resources :article_comments, except: [:update]
        collection do
          get '/url_filter', to: 'articles#url_filter'
          post '/loop', to: 'articles#loop_create'
        end
        get '/users/:user_id/likes', to: 'articles#like_show'
        get '/likes', to: 'articles#like_number'
        post '/likes', to: 'articles#like_create'
        delete '/users/:user_id/likes', to: 'articles#like_destroy'

        get '/users/:user_id/loop', to: 'articles#loop_show'
        delete '/users/:user_id/loop', to: 'articles#loop_destroy'
      end

    end
  end
end
