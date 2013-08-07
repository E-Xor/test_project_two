class FrogsController < ApplicationController
  def main
    @frogs = Frog.all # Debug
    render 'frogs/index' # Explicitly render a template,
                         # actual data loading will happen from Backbone using CRUD methods below
  end

  def index
    render :json => Frog.all.to_json
  end

  def show
    render :json => Frog.find_by_id(params[:id]).to_json
  end

  def create
    Rails.logger.debug "FrogsController::create. Params: #{params.inspect}"
  end

  def update
    Rails.logger.debug "FrogsController::update. Params: #{params.inspect}"
  end

  def destroy
    Rails.logger.debug "FrogsController::destroy. Params: #{params.inspect}"
  end
end
