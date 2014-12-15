(function(root){
  var Asteroids = root.Asteroids = root.Asteroids || {};

  SHIPRADIUS = 0;
  BULLETRADIUS = 3;

  var Ship = Asteroids.Ship = function(game) {
    this.center = [30,(DIM_Y / 2)]
    Asteroids.MovingObject.call(this, {
      pos: this.center,
      vel: [0, 0],
      radius: SHIPRADIUS,
      color: "rgb(0, 0, 0)",
      game: game,
    });
    this.vertices = Asteroids.Util.calculateTriangle(this.pos);
  }
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function() {
    this.explode("rgb(255,255,255)");
    this.explode("rgb(200,0,0)");
    this.pos = this.center
    this.vel = [0, 0];
  }

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0]
    this.vel[1] += impulse[1]
  }

  Ship.prototype.fireBullet = function() {
    var vel = this.vel.slice(0)
    var pos = this.pos.slice(0)

    pos[0] = pos[0] + 50 + BULLETRADIUS
    vel[0] = vel[0] + 10;
    var bullet = new Asteroids.Bullet(this.game, pos, vel);
    this.game.addObject(bullet);
  }

  Ship.prototype.draw = function(ctx) {
    var vertices = Asteroids.Util.calculateTriangle(this.pos);
    this.color = this.makeColor()
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(vertices[0][0], vertices[0][1]);
    ctx.lineTo(vertices[1][0], vertices[1][1]);
    ctx.lineTo(vertices[2][0], vertices[2][1]);

    ctx.fill();
  }

  Ship.prototype.clearObjectIfOff = function() {
    if (this.game.clearedAreaLeft(this)) {
      this.bounce('x')
    }
  }

})(window);
