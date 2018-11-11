class Api::ReportsController < ApplicationController
  before_action :find_user, only: [:index, :find, :create, :export_csv]

  def index
  end

  def find
    if user && report = user.reports.find_or_init(params[:date])
      return render json: {status: true, report: report.res_attrs}
    end
    render json: {status: false, report: Report.new.res_attrs}
  end

  def export_csv
    if user && reports = user.reports.where(project_id: params[:project_id]).date_from(params[:start_date].to_date, params[:end_date].to_date)
      return render json: {status: true, reports: reports.map(&:export_csv_attrs)}
    end
    render json: {status: false, reports: []}
  end

  def create
    if user && report = user.reports.find_or_init(params[:date])
      if report.update_attributes report_params
        return render json: {status: true}
      end
    end
    render json: {status: false}
  end

  private
  attr_reader :user

  def find_user
    @user = User.find_by token: params[:token]
  end

  def report_params
    params.require(:report).permit :today_plan, :actual_archiverment,
      :next_plan, :issues, :daily_report, :project_id
  end
end
