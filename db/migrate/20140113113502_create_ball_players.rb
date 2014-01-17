class CreateBallPlayers < ActiveRecord::Migration
  def change
    create_table :ball_players do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :position, null: false, limit: 1
      t.date :born, null: false
      t.integer :height, null: false # inches
      t.integer :weight, null: false # lbs
      t.integer :rookie_year, null: false

      t.timestamps
    end
  end
end
