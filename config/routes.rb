Rails.application.routes.draw do
# path = "" removes "/api" before /instructions bc subdomain is now api
  namespace :api, :path => "", :constraints => {:subdoamin => "api"}, :default => {:format => :json} do
    resources :instructions
  end
end
