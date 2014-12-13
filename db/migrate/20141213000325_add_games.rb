class AddGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name, null: false
      t.integer :score, null: false

      t.timestamps
    end
  end
end
