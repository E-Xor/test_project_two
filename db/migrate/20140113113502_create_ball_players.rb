class CreateBallPlayers < ActiveRecord::Migration
  def change
    create_table :ball_players do |t|
      t.string  :first_name
      t.string  :last_name
      t.string  :position, limit: 1
      t.date    :born
      t.integer :height # inches
      t.integer :weight # lbs
      t.integer :rookie_year

      t.timestamps
    end
  end
end
