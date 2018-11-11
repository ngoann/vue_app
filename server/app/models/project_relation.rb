class ProjectRelation < ApplicationRecord
  belongs_to :member, class_name: User.name, foreign_key: :user_id
  belongs_to :project

  validates :user_id, uniqueness: {scope: :project_id}

  default_scope do
    order(created_at: :desc)
  end
end
