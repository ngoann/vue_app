class ProjectRelation < ApplicationRecord
  belongs_to :member, class_name: User.name, foreign_key: :user_id
  belongs_to :project
end
