class Api::Admin::ProjectsController < ApplicationController
  before_action :find_admin

  def index
    if admin
      render json: {status: true, projects: admin.managing_projects_attrs}
    else
      render json: {status: false, message: "Access denied!"}
    end
  end

  def create
    if admin && @project = admin.managing_projects.build(project_params)
      if project.save
        admin.admin_project_mamangers.create project_id: project.id
        render json: {status: true, projects: admin.managing_projects_attrs}
      else
        render json: {status: false, message: "Create project failed!"}
      end
    else
      render json: {status: false, message: "Access denied!"}
    end
  end

  private
  attr_reader :admin, :project

  def find_admin
    @admin = User.admin.find_by token: params[:token]
  end

  def project_params
    params.require(:project).permit :name
  end
end
