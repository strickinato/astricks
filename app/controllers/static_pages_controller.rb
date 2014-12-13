class StaticPagesController < ApplicationController
  def root
    @games = Game.order("score DESC").limit(10)
  end
end
