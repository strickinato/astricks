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



 })(window);
