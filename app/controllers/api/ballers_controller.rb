class Api::BallersController < ApplicationController

  def index
    render json: [
      {id: 1, first_name: 'LeBron', last_name: 'James', position: 'SG/SF'},
      {id: 2, first_name: 'Kevin', last_name: 'Durant', position: 'SF'}
    ]
  end

  def show
    render json: {id: 1, first_name: 'LeBron', last_name: 'James', position: 'SG/SF'}
  end

  def update
  end

  def destroy
  end

end
