class User < ApplicationRecord
  before_save :init_secret

  validates :name, :username, :password, presence: true
  validates :name, :username, uniqueness: true

  has_many :reports
  has_many :admin_project_mamangers, class_name: ProjectManager.name, foreign_key: :user_id
  has_many :member_project_relations, class_name: ProjectRelation.name, foreign_key: :user_id
  has_many :managing_projects, through: :admin_project_mamangers, source: :project
  has_many :joined_projects, through: :member_project_relations, source: :project
  belongs_to :current_project, class_name: Project.name

  enum role: [:member, :admin]

  def managing_projects_attrs
    managing_projects.map do |project|
      {id: project.id, name: project.name, member_count: project.members.count}
    end
  end

  def response_attrs
    {
      name: name,
      admin: admin?,
      token: token
    }
  end

  private
  def init_secret
    assign_attributes token: SecureRandom.hex(32) unless token
  end
end
