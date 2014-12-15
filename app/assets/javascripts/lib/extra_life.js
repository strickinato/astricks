(function (root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  var ExtraLife = Asteroids.ExtraLife = function(pos, game) {
    Asteroids.MovingObject.call(this, {
      pos: pos,
      vel: Asteroids.Util.randomVel(),
      radius: 15,
      game: game
    });
  }

  Asteroids.Util.inherits(ExtraLife, Asteroids.MovingObject);


  ExtraLife.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      this.game.removeObject(this)
      this.game.lives += 1;
      this.explode("rgb(255, 255, 255)");
      this.explode("#7CFC00")
      this.explode("random")
    }
  }

  ExtraLife.prototype.clearObjectIfOff = function() {
    if (this.game.clearedAreaLeft(this)) {
      this.game.removeObject(this)
    }
  }

  ExtraLife.prototype.draw = function(ctx) {
    this.color = this.makeColor()
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  }


})(window);
