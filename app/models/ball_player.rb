class BallPlayer < ActiveRecord::Base
  attr_accessible :first_name, :last_name, :position, :born, :height, :weight, :rookie_year, :picture

  validates :first_name, :last_name, presence: true # , :position, :born, :height, :weight, :rookie_year, presence: true
  # validates :position, inclusion: {in: %w[F G C], message: 'must be a Forward(F), Guard(G) or Center(C)'}
  # validates :height, numericality: {greater_than: 50, less_than: 100, only_integer: true} # inches
  # validates :weight, numericality: {greater_than: 50, less_than: 200, only_integer: true} # lbs
  # validates :rookie_year, numericality: {greater_than: 1946, less_than: Time.now.year, only_integer: true}

end
