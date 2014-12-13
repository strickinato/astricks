(function(root){
  var Asteroids = root.Asteroids = root.Asteroids || {};

  SHIPRADIUS = 20;
  BULLETRADIUS = 3;

  var Ship = Asteroids.Ship = function(game) {
    var center = [(DIM_X / 2),(DIM_Y / 2)]
    Asteroids.MovingObject.call(this, {
      pos: center,
      vel: [0, 0],
      radius: SHIPRADIUS,
      color: "rgb(0, 0, 0)",
      game: game,
    });
    this.orientation = 1;
  }
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  }

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0]
    this.vel[1] += impulse[1]
  }

  Ship.prototype.fireBullet = function() {
    var vel = this.vel.slice(0)
    var pos = this.pos.slice(0)

    pos[0] = pos[0] + SHIPRADIUS + BULLETRADIUS
    vel[0] = vel[0] + 5;
    var bullet = new Asteroids.Bullet(this.game, pos, vel);
    this.game.addObject(bullet);
  }

  Ship.prototype.draw = function(ctx) {
    var vertices = Asteroids.Util.calculateTriangle(this.pos, this.orientation);
    this.color = this.makeColor()
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(vertices[0][0], vertices[0][1]);
    ctx.lineTo(vertices[1][0], vertices[1][1]);
    ctx.lineTo(vertices[2][0], vertices[2][1]);

    ctx.fill();
  }

  // MovingObject.prototype.draw = function(ctx) {
  //   ctx.fillStyle = this.color;
  //   ctx.beginPath();
  //
  //   ctx.arc(
  //     this.pos[0],
  //     this.pos[1],
  //     this.radius,
  //     0,
  //     2 * Math.PI,
  //     false
  //   );
  //
  //   ctx.fill();

})(window);
