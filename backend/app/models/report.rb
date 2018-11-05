class Report < ApplicationRecord
  belongs_to :user

  delegate :name, to: :user, prefix: true, allow_nil: true

  scope :find_or_init, -> date_string { find_or_initialize_by(date: date_string) }
  scope :date_from, -> start_date, end_date { where date: start_date..end_date }

  def res_attrs
    {
      today_plan: today_plan,
      actual_archiverment: actual_archiverment,
      next_plan: next_plan,
      issues: issues,
      daily_report: daily_report
    }
  end

  def export_csv_attrs
    {
      date: date.strftime("%Y/%m/%d"),
      name: user_name,
      today_plan: today_plan,
      actual_archiverment: actual_archiverment,
      next_plan: next_plan,
      issues: issues,
      daily_report: daily_report
    }
  end
end
