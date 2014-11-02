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
    sleep 1

    begin
      frog = Frog.create!(params[:frog])

      render :json => frog.to_json
    rescue => e
      Rails.logger.error "Error happened: #{e.inspect}"
      Rails.logger.debug e.backtrace.join("\n\t")
      render :json => {error: "Error happened saving a frog"}, :status => :unprocessable_entity
    end
  end

  def update
    sleep 1

    begin
      frog = Frog.find(params[:id])
      frog.update_attributes!(params[:frog])

      render :json => frog.to_json
    rescue => e
      Rails.logger.error "Error happened: #{e.inspect}"
      Rails.logger.debug e.backtrace.join("\n\t")
      render :json => {error: "Error happened updating a frog"}, :status => :unprocessable_entity
    end
  end

  def destroy
    begin
      frog = Frog.find(params[:id])
      frog.destroy

      render :json => frog.to_json
    rescue => e
      Rails.logger.error "Error happened: #{e.inspect}"
      Rails.logger.debug e.backtrace.join("\n\t")
      render :json => {error: "Error happened destroying a frog"}, :status => :unprocessable_entity
    end
  end

  def search
    # Make sure you have Solr runing and indexed the table before you use this action

    search_params = params.slice(:name, :age)
    if search_params.length == 2
      search = Frog.search do
        fulltext search_params[:name]
        with :age, params[:age]
      end
    elsif search_params.length == 1
      if search_params.has_key?(:name)
        search = Frog.search { fulltext search_params[:name] }
      else
        search = Frog.search { with :age, params[:age] }
      end
    else
      render json: []
      return
    end

    render json: search.results
  end
end
