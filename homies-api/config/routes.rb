Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do

      resources :users, only: [:index, :create, :show]
        get '/users/:id/article_likes', to: 'users#article_like'
        get '/users/:id/product_interests', to: 'users#product_interest'

      resources :circles, only: [:create, :show, :update, :destroy] do
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

      scope '/articles/:article_id', as: 'articles' do
        resources :article_comments, except: [:update]
        get '/likes', to: 'articles#like_number'
        post '/likes', to: 'articles#like_create'
        delete '/likes', to: 'articles#like_destroy'
      end
    end
  end
end
