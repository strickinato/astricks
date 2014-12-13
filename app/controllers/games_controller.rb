class GamesController < ApplicationController
  def index
    @games = Game.order("score DESC").limit(10)
    render :json => @games
  end

  def create
    # @game = Game.new(game_params)
    #
    # if @game.save!
    #
    # else
    #
    # end
  end

  private
  def game_params
    params.require(:game).permit(:name, :score)
  end
end
