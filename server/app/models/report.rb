class Report < ApplicationRecord
  belongs_to :user

  delegate :name, to: :user, prefix: true, allow_nil: true

  scope :find_or_init, -> date_string { find_or_initialize_by(date: date_string) }
end
