class AddPictureBinToBallPlayers < ActiveRecord::Migration
  def change
    if ActiveRecord::Base.connection.instance_of?(ActiveRecord::ConnectionAdapters::PostgreSQLAdapter)
      add_column :ball_players, :picture_bin, :text, after: :picture
    else
      add_column :ball_players, :picture_bin, :text, after: :picture, limit: 4294967295
    end
  end
end
