class CreateProjectRelations < ActiveRecord::Migration[5.1]
  def change
    create_table :project_relations do |t|
      t.references :user
      t.references :project

      t.timestamps
    end
  end
end
