window.DragonFlyight = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    DragonFlyight.HighScores = new DragonFlyight.Collections.Games();
    DragonFlyight.HighScores.fetch();
  }
};

$(document).ready(function(){
  DragonFlyight.initialize();
  Asteroids.Util.loadNonGame();
});
