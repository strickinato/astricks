(function (root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  var Util = Asteroids.Util = Asteroids.Util || {};

  var inherits = Util.inherits = function(subClass, superClass) {
    function Surrogate() {
      this.constructor = subClass
    };
    Surrogate.prototype = superClass.prototype;
    subClass.prototype = new Surrogate();

  }

  Util.randomVel = function(length) {
    dx = (Math.random() * 2 - 1) * length;
    dy = (Math.random() * 2 - 1) * length;
    return [dx, dy];
  }

  Util.calculateTriangle = function(pos, or) {
    var vertices = [[],[pos],[]]
    vertices[0] = [(pos[0] - (50 * Math.cos(or))), (pos[1] - 15)]
    vertices[1] = pos
    vertices[2] = [(pos[0] - (50 * Math.cos(or))), (pos[1] + 15)]

    return vertices
  }

  Util.endGame = function(points) {
    $("#game-canvas").hide()
    $("#post-game-box").show()
    console.log(DragonFlyight.HighScores)
    var view = new DragonFlyight.Views.HighScores({
      collection: DragonFlyight.HighScores
    })
    $("#post-game-box").html(view.render().$el)

  }


  Util.resetGame = function() {
    var canvasEl = document.getElementsByTagName("canvas")[0];
    var ctx = canvasEl.getContext('2d');
    canvasEl.height = window.innerHeight;
    canvasEl.width = window.innerWidth;
    var game = new Asteroids.Game()
    var gameView = new Asteroids.GameView(game, ctx);
    gameView.start();
  }

})(window);
