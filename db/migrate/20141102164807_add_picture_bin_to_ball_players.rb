class AddPictureBinToBallPlayers < ActiveRecord::Migration
  def change
    add_column :ball_players, :picture_bin, :text, after: :picture, limit: 4294967295
  end
end
