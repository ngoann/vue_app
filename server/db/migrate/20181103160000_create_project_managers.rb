class CreateProjectManagers < ActiveRecord::Migration[5.1]
  def change
    create_table :project_managers do |t|
      t.references :user
      t.references :project

      t.timestamps
    end
  end
end
