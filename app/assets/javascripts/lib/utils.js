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
    dx = (Math.random() * -1) * length;
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

  Util.loadNonGame = function(points) {
    var view = new DragonFlyight.Views.NonGame({
      collection: DragonFlyight.HighScores,
      points: points
    })
    $("#main").html(view.render().$el)
    if (points) {
      this.checkScore(points)
    }
  }

  Util.checkScore = function(points) {
    if (points > DragonFlyight.HighScores.last().get("score")) {
      $("#high-score-form").fadeIn()
      .animate({top:275}, 800);
    }
  }

  Util.submitForm = function() {
    var formData = {game: {score: 0, name: ""}}
    formData.game.score = parseInt($("#game_score").val());
    formData.game.name = $("#game_name").val();
    JSON.stringify(formData)

    var highScore = new DragonFlyight.Models.Game(formData);
    highScore.save(null, {
      success: function(model) {
        $("#high-score-form").fadeOut()
        .animate({top:-500}, 800);
        DragonFlyight.HighScores.add(model);
      }
    });
  }

  Util.startGame = function() {
    var view = new DragonFlyight.Views.Game()
    $("#main").html(view.render().$el)
    var canvasEl = document.getElementsByTagName("canvas")[0];
    var ctx = canvasEl.getContext('2d');
    canvasEl.height = window.innerHeight;
    canvasEl.width = window.innerWidth;
    var game = new Asteroids.Game()
    var gameView = new Asteroids.GameView(game, ctx);
    gameView.start();
  }

  Util.randomFloat = function(min, max) {
    return min + Math.random()*(max-min);
  }


})(window);
