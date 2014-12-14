(function (root){
 var Asteroids = root.Asteroids = root.Asteroids || {};

 var RADIUS = 20;

 var Asteroid = Asteroids.Asteroid = function(pos, game) {
   var color = this.makeColor()
   Asteroids.MovingObject.call(this, {
     pos: pos,
     vel: Asteroids.Util.randomVel(3),
     radius: RADIUS,
     color: color,
     game: game
   });
 }


 Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

 Asteroid.prototype.collideWith = function(otherObject) {
   if (otherObject instanceof Asteroids.Ship) {
     this.game.ship.relocate();
     this.game.lives -= 1;
   }
 }

 Asteroid.prototype.clearObjectIfOff = function() {
   if (this.game.clearedAreaLeft(this)) {
     this.game.removeObject(this)
   }
 }

 Asteroid.prototype.statusCheck = function() {
   if(this.radius < 5) {
     this.game.points += 5;
     this.game.removeObject(this);
     this.explode();
   }
 }

 Asteroid.prototype.explode = function() {
   var minSize = 10;
   var maxSize = 30;
   var count = 10;
   var minSpeed = 2.0;
   var maxSpeed = 5.0;
   var minScaleSpeed = 1.0;
   var maxScaleSpeed = 4.0;
   var speed = Asteroids.Util.randomFloat(minSpeed, maxSpeed);

   for (var angle=0; angle<360; angle += Math.round(360/count)) {
     var velX = speed * Math.cos(angle * Math.PI / 180.0) + this.vel[0];
     var velY = speed * Math.sin(angle * Math.PI / 180.0) + this.vel[1];
     var particle = new Asteroids.ExplodingObject({
       pos: this.pos,
       radius: Asteroids.Util.randomFloat(minSize, maxSize),
       scaleSpeed: Asteroids.Util.randomFloat(minScaleSpeed, maxScaleSpeed),
       vel: [velX, velY],
       color: '#FFF',
       game: this.game
     });
     this.game.addObject(particle)
   }
 }


 })(window);
