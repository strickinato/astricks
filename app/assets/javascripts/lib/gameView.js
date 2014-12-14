(function (root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function() {
    this.game.interval = root.setInterval((function () {
      this.game.step();
      this.game.draw(this.ctx);
      this.bindKeys();
    }).bind(this), 1000/60);

    root.setInterval((function() {
      var newAsteroid = new Asteroids.Asteroid(this.game.randomPosition(), this.game);
      this.game.addObject(newAsteroid);
    }).bind(this), 1000);
  };

  GameView.prototype.bindKeys = function() {
    if(key.isPressed('up')) this.game.ship.power([0, -.1]);
    if(key.isPressed('down')) this.game.ship.power([0, .1]);
    if(key.isPressed('left')) this.game.ship.power([-.1, 0]);
    if(key.isPressed('right')) this.game.ship.power([.1, 0]);
    if(key.isPressed('space')) this.game.ship.fireBullet();
  }

})(window);
