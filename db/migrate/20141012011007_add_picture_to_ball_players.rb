class AddPictureToBallPlayers < ActiveRecord::Migration
  def change
    add_column :ball_players, :picture, :string, limit: 14, after: :rookie_year
  end
end
