(function (root) {
 var Asteroids = root.Asteroids = root.Asteroids || {};

 var MovingObject = Asteroids.MovingObject = function(options) {
   this.pos = options.pos;
   this.vel = options.vel;
   this.radius = options.radius;
   this.color = options.color;
   this.game = options.game;
 }

 MovingObject.prototype.makeColor = function() {
   var r = Math.floor(Math.random() * 255)
   var g = Math.floor(Math.random() * 255)
   var b = Math.floor(Math.random() * 255)
   return "rgb("+ r +","+ g +","+ b +")"
 }

 MovingObject.prototype.draw = function(ctx) {
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

 MovingObject.prototype.move = function() {
   if (this.game.isHittingWall(this)) {
     this.bounce('y')
   }
   this.clearObjectIfOff();
   var newX = (this.pos[0] + this.vel[0])
   var newY = (this.pos[1] + this.vel[1])
   var newPos = [newX, newY]
   this.pos = newPos
 }

 MovingObject.prototype.bounce = function(dim) {
   if(dim == "x") this.vel[0] = -this.vel[0];
   if(dim == "y") this.vel[1] = -this.vel[1];
 }

 MovingObject.prototype.clearObjectIfOff = function() {
 }



 MovingObject.prototype.isCollidedWith = function(otherObject){
   if (otherObject) {
     var xDist = this.pos[0] - otherObject.pos[0];
     var yDist = this.pos[1] - otherObject.pos[1];
     var currentDistance = Math.floor(Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2)));
     var collisionDistance = this.radius + otherObject.radius;
     return (currentDistance <= collisionDistance);
   }
 }

 MovingObject.prototype.collideWith = function(otherObject) {
 }


})(window);
