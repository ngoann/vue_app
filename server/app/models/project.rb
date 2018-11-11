class Project < ApplicationRecord
  has_many :project_project_mamangers, class_name: ProjectManager.name, foreign_key: :project_id
  has_many :admins, through: :project_project_mamangers, source: :admin
  has_many :project_project_relations, class_name: ProjectRelation.name, foreign_key: :project_id
  has_many :members, through: :project_project_relations, source: :member

  validates :name, uniqueness: true


  def members_attrs
    members.uniq.map do |member|
      {id: member.id, name: member.name, token: member.token}
    end
  end
end
