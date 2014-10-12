class Api::BallersController < ApplicationController

  def index
    render json: BallPlayer.order(:first_name).all
  end

  def show
    bp = BallPlayer.where(id: params[:id]).first
    position_full = "Unknown"
    case bp.position
    when 'G'
      position_full = "Guard"
    when 'F'
      position_full = "Forward"
    when 'C'
      position_full = "Center"
    when 'F-G'
      position_full = "Forward/Guard"
    when 'F-C'
      position_full = "Forward/Center"
    end
    render json: bp.attributes.merge!(position_full: position_full)
  end

  def create
    sleep 1
    create_params = params.slice(:first_name, :last_name, :position, :born, :height, :weight, :rookie_year)
    b = BallPlayer.create!(create_params)
    flash[:saved] = true
    render json: b.to_json
  rescue ActiveRecord::RecordInvalid => e
    Rails.logger.error "Validation Error in Api::BallersController#create:\n\t#{e.inspect}"
    Rails.logger.error "Create params: #{create_params}" if create_params
    render json: {error: e.to_s}, status: :internal_server_error
  rescue => e
    Rails.logger.error "Error saving in Api::BallersController#create:\n\t#{e.inspect}"
    Rails.logger.error "Create params: #{create_params}" if create_params
    render json: {error: 'error'}, status: :internal_server_error
  end

  def update
    sleep 1
    b = BallPlayer.find(params[:id])

    (prefix, base64picture) = params[:picture].split(',') # value looks like "data:image/png;base64,iVBORw0KGgoAAAANS...YruxybJ1Z/9k="
    file_ext = prefix.split(';').first.split('/').last
    file_name = params[:id] + '.' + file_ext
    Rails.logger.debug "about to save to: #{Rails.root}/public/pictures/#{file_name}"
    File.open("#{Rails.root}/public/pictures/#{file_name}", 'wb') do |f|
        f.write(Base64.decode64(base64picture))
    end

    attributes_for_update = params.slice(:first_name, :last_name, :position, :born, :height, :weight, :rookie_year)
    attributes_for_update.merge!(picture: file_name) if file_name
    b.update_attributes!(attributes_for_update)
    flash[:saved] = true
    render json: {updated: 'ok', ball_player: b}.to_json
  rescue => e
    Rails.logger.error "Error updating in Api::BallersController#create:\n\t#{e.inspect}"
    Rails.logger.error "Create params: #{attributes_for_update}" if attributes_for_update
    render json: {updated: 'error'}, status: :internal_server_error
  end

  def destroy
    b = BallPlayer.find(params[:id])
    b.delete
    render json: {deleted: 'ok'}
  rescue => e
    Rails.logger.error "Error updating in Api::BallersController#create:\n\t#{e.inspect}"
    Rails.logger.error "Create params: #{attributes_for_update}" if attributes_for_update
    render json: {deleted: 'error'}, status: :internal_server_error
  end

end
