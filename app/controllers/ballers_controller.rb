class BallersController < ApplicationController
  def main
    render 'frogs/index' # Explicitly render a template,
                         # actual data loading will happen from Backbone using CRUD methods below
  end

  def index
    Rails.logger.debug "BallersController::index. Params: #{params.inspect}"
    render 'ballers/index'
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
