class Api::Admin::ProjectsController < ApplicationController
  before_action :find_admin

  def index
    if admin
      render json: {status: true, projects: admin.managing_projects_attrs}
    else
      render json: {status: false, projects:[], message: "Access denied!"}
    end
  end

  def infor
    if admin && @project = Project.find_by(id: params[:project_id])
      render json: {status: true, members: project.members_attrs, project: project}
    else
      render json: {status: false, members: [], project: {}, message: "Project not exists!"}
    end
  end

  def add_member
    if admin && @project = Project.find_by(id: params[:project_id])
      if params[:member_ids].present? && params[:member_ids].is_a?(Array)
        params[:member_ids].each do |member_id|
          project.project_project_relations.create user_id: member_id
        end

        render json: {status: true, members: project.members_attrs, project: project}
      else
        render json: {status: false, members: [], project: {}, message: "Please select members!"}
      end
    else
      render json: {status: false, members: [], project: {}, message: "Project not exist!"}
    end
  end

  def create
    if admin && @project = admin.managing_projects.build(project_params)
      if project.save
        admin.admin_project_mamangers.create project_id: project.id
        render json: {status: true, projects: admin.managing_projects_attrs}
      else
        render json: {status: false, projects: [], message: "Create project failed!"}
      end
    else
      render json: {status: false, projects: [], message: "Access denied!"}
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
