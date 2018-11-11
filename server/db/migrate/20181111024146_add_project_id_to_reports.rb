class AddProjectIdToReports < ActiveRecord::Migration[5.1]
  def change
    add_column :reports, :project_id, :integer
  end
end
