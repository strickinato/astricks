(function(root){
  var Asteroids = root.Asteroids = root.Asteroids || {};

  var Bullet = Asteroids.Bullet = function(game, pos, vel) {
    Asteroids.MovingObject.call(this, {
      pos: pos,
      vel: vel,
      radius: BULLETRADIUS,
      color: "rgb(200, 0, 0)",
      game: game
    });

  }
  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);


  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.removeObject(this)
      otherObject.radius -= 1;
      this.game.points += 1;
    } else if (otherObject instanceof Asteroids.Ship) {
      this.game.removeObject(this)
    }
  }


  Bullet.prototype.clearObjectIfOff = function() {
    if (this.game.clearedAreaRight(this)) {
      this.game.removeObject(this)
    }
  }

})(window);
