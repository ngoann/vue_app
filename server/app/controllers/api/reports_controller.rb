class Api::ReportsController < ApplicationController
  before_action :find_user, only: [:index, :find, :create]

  def index
  end

  def find
    if user && report = user.reports.find_or_init(params[:date])
      return render json: {status: true, report: report.res_attrs}
    end
    render json: {status: false, report: Report.new.res_attrs} 
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
      :next_plan, :issues, :daily_report
  end
end
