Rails.application.routes.draw do
# path = "" removes "/api" before /instructions bc subdomain is now api
  namespace :api, :path => "", :constraints => {:subdoamin => "api"}, :default => {:format => :json} do
    resources :instructions
  end
<<<<<<< HEAD
  # get "/*path", to: "react#index"
=======
>>>>>>> 4cbd2f39e74e8f02ea96c571a875e647ea877fde
end
