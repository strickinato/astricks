class Game < ActiveRecord::Base
  validates :score, :name, presence: true
end
