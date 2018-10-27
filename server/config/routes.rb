Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    post "/auth/authenticate_token", to: "auth#authenticate_token"
    post "/auth/sign_in", to: "auth#sign_in"
    post "/auth/sign_up", to: "auth#sign_up"
  end
end
