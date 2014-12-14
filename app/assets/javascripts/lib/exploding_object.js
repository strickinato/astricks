(function (root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  var ExplodingObject = Asteroids.ExplodingObject = function(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    this.scaleSpeed = options.scaleSpeed
  }

  Asteroids.Util.inherits(ExplodingObject, Asteroids.MovingObject);

  ExplodingObject.prototype.move = function() {
    var newX = (this.pos[0] + this.vel[0])
    var newY = (this.pos[1] + this.vel[1])
    var newPos = [newX, newY]
    this.radius -= this.scaleSpeed;
    if (this.radius <= 0) {
      this.radius = 0;
    }
    this.pos = newPos
  }


})(window);
