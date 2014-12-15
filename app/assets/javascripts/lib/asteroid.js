(function (root){
 var Asteroids = root.Asteroids = root.Asteroids || {};

 var RADIUS = 20;

 var Asteroid = Asteroids.Asteroid = function(pos, mod, game) {
   var color = this.makeColor()
   Asteroids.MovingObject.call(this, {
     pos: pos,
     vel: Asteroids.Util.randomVel(mod),
     radius: RADIUS,
     color: "#FFF",
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
     this.explode("random");
   }
 }


 })(window);
