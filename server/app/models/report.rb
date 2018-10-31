class Report < ApplicationRecord
  belongs_to :user

  delegate :name, to: :user, prefix: true, allow_nil: true

  scope :find_or_init, -> date_string { find_or_initialize_by(date: date_string) }

  def res_attrs
    {
      today_plan: today_plan,
      actual_archiverment: actual_archiverment,
      next_plan: next_plan,
      issues: issues,
      daily_report: daily_report
    }
  end
end
