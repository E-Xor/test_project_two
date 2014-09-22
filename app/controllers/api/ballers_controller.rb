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
    b = BallPlayer.find(params[:id])
    attributes_for_update = params.slice(:first_name, :last_name, :position, :born, :height, :weight, :rookie_year)
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
