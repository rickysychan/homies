Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do

      resources :users, only: [:index, :create, :show]
        get '/users/:id/article_likes', to: 'users#article_like'
        get '/users/:id/product_interests', to: 'users#product_interest'
      resources :circles, only: [:create, :show, :update, :destroy] do
        resources :circle_users, except: [:update]
        resources :posts do
          resources :post_comments
        end
      end
      get 'product/:product_id/interests', to: 'products#interest_number'
      scope '/articles/:article_id', as: 'articles' do
        resources :article_comments
        get '/likes', to: 'articles#like_number'
      end
    end
  end
end
