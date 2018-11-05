class Api::AuthController < Api::ApplicationController
  def authenticate_token
    user = User.find_by token: params[:token]

    if user
      render json: {auth: true, user: user.response_attrs}
    else
      render json: {auth: false}
    end
  end

  def sign_in
    user = User.find_by username: params[:username], password: params[:password]

    if user
      render json: {auth: true, user: user.response_attrs}
    else
      render json: {auth: false}
    end
  end

  def sign_up
    user = User.new sign_up_params

    if user.save
      render json: {auth: true, user: user.response_attrs}
    else
      render json: {auth: false}
    end
  end

  private

  def sign_in_params
    {
      username: params[:username],
      remember_me: params[:remember],
      password: params[:password]
    }
  end

  def sign_up_params
    {
      name: params[:name],
      username: params[:username],
      password: params[:password]
    }
  end
end
