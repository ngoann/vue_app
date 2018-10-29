class Api::ReportsController < ApplicationController
  def index
    user = User.find_by token: params[:token]

  end

  def create
    user = User.find_by token: params[:token]

    if user && report = user.reports.find_or_init(params[:date])
      if report.update_attributes report_params
        return render json: {status: true}
      end
    end
    render json: {status: false}
  end

  private

  def report_params
    params.require(:report).permit :today_plan, :actual_archiverment,
      :next_plan, :issues, :daily_report
  end
end
