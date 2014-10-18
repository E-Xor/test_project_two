class Api::BallersController < ApplicationController
  PICTURE_FOLDER = "public/pictures"

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

    file_name = save_picture(params[:picture])
    create_params = params.slice(:first_name, :last_name, :position, :born, :height, :weight, :rookie_year)
    create_params.merge!(picture: file_name) if file_name

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
    Rails.logger.debug e.backtrace.join("\n\t")
    render json: {error: 'error'}, status: :internal_server_error
  end

  def update
    sleep 1

    b = BallPlayer.find(params[:id])
    file_name = save_picture(params[:picture])
    attributes_for_update = params.slice(:first_name, :last_name, :position, :born, :height, :weight, :rookie_year)
    if file_name
      File.delete("#{PICTURE_FOLDER}/#{b.picture}") if b.picture.present?
      attributes_for_update.merge!(picture: file_name)
    end

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

  private

  def save_picture(picture = nil)
    return nil unless picture

    (prefix, base64picture) = picture.split(',') # value looks like "data:image/png;base64,iVBORw0KGgoAAAANS...YruxybJ1Z/9k="
    file_ext = prefix.split(';').first.split('/').last
    file_name = Time.now.to_i.to_s + '.' + file_ext
    Rails.logger.debug "about to save to: #{Rails.root}/public/pictures/#{file_name}"
    File.open("#{PICTURE_FOLDER}/#{file_name}", 'wb') do |f|
        f.write(Base64.decode64(base64picture))
    end

    return file_name
  end

end
