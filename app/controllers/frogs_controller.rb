class FrogsController < ApplicationController
  def main
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
    begin
      frog = Frog.find(params[:id])
      frog.update_attributes(params[:frog])

      render :json => frog.to_json
    rescue => e
      Rails.logger.error "Error happened: #{e.inspect}"
      Rails.logger.debug e.backtrace.join("\n\t")
      render :json => {error: e.inspect}, :status => :unprocessable_entity
    end
  end

  def destroy
    Rails.logger.debug "FrogsController::destroy. Params: #{params.inspect}"
  end
end
