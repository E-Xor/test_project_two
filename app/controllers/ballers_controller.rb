class BallersController < ApplicationController
  def index
    Rails.logger.debug "BallersController::index. Params: #{params.inspect}"
    @players = [
      {first_name: 'LeBron', last_name: 'James', position: 'SG/SF'},
      {first_name: 'Kevin', last_name: 'Durant', position: 'SF'}
    ]
  end

  def show
    Rails.logger.debug "BallersController::show. Params: #{params.inspect}"
  end

  def create
    Rails.logger.debug "BallersController::create. Params: #{params.inspect}"
  end

  def update
    Rails.logger.debug "BallersController::update. Params: #{params.inspect}"
  end

  def destroy
    Rails.logger.debug "BallersController::destroy. Params: #{params.inspect}"
  end
end
