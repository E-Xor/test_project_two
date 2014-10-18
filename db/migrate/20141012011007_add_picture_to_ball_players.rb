class AddPictureToBallPlayers < ActiveRecord::Migration
  def change
    add_column :ball_players, :picture, :string, limit: 15, after: :rookie_year
  end
end
