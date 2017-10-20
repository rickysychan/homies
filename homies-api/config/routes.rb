Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:create, :show]
    get '/article_likes', to: 'users#article_like'
  resources :circles, only: [:create, :show, :update, :destroy] do
    resources :circle_users, except: [:update]
    resources :posts do
      resources :post_comments
    end
  end
  get 'articles/:article_id/likes', to: 'articles#like_number'
  resources :article_comments
end
