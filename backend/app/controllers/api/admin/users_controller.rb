class Api::Admin::UsersController < ApplicationController
  before_action :find_admin, only: [:not_in_project]

  def not_in_project
    if admin
      render json: {status: true, members: User.where.not(id: Project.find_by(id: params[:project_id]).try(:members).try(:ids))}
    else
      render json: {status: false, members:[], message: "Access denied!"}
    end
  end

  private
  attr_reader :admin

  def find_admin
    @admin = User.admin.find_by token: params[:token]
  end
end
