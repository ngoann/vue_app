class HomeController < ApplicationController
  # protect_from_forgery with: :exception

  def index
    render json: {status: true}
  end
end
