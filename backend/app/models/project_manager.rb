class ProjectManager < ApplicationRecord
  belongs_to :admin, class_name: User.name, foreign_key: :user_id
  belongs_to :project
end
