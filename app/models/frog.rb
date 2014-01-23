class Frog < ActiveRecord::Base
  attr_accessible :age, :name
  validates :name, presence: true
  validates :age, numericality: {greater_than: 0, less_than: 100}

  searchable do
    text :name
    integer :age
  end

end
