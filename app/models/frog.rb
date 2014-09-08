class Frog < ActiveRecord::Base
  attr_accessible :age, :name
  validates :name, presence: true
  validates :age, numericality: {greater_than: 0, less_than: 100}

  # searchable do # Uncomment if you want to use Solr
  #   text :name
  #   integer :age
  # end

end
