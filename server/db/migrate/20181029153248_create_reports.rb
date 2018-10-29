class CreateReports < ActiveRecord::Migration[5.1]
  def change
    create_table :reports do |t|
      t.references :user
      t.date :date
      t.text :today_plan
      t.text :actual_archiverment
      t.text :next_plan
      t.text :issues
      t.string :daily_report

      t.timestamps
    end
  end
end
