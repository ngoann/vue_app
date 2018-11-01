Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/home', to: 'home#index'
  namespace :api do
    post "/auth/authenticate_token", to: "auth#authenticate_token"
    post "/auth/sign_in", to: "auth#sign_in"
    post "/auth/sign_up", to: "auth#sign_up"
    resources :reports do
      collection do
        post "find"
        post "export_csv"
      end
    end
  end
end
