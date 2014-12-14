(function (root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  DIM_X = window.innerWidth;
  DIM_Y = window.innerHeight;
  NUM_ASTEROIDS = 10;
  BULLET_COUNT = 20;

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets = [];
    this.explodingObjects = [];
    this.ship = new Asteroids.Ship(this)
    this.addAsteroids();
    this.lives = 3;
    this.points = 0;
    this.difficulty = 1;
  }

  Game.prototype.allObjects = function() {
    var allObjects = this.asteroids.slice(0)
    allObjects = allObjects.concat(this.ship).concat(this.bullets).concat(this.explodingObjects);
    return allObjects
  }

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < NUM_ASTEROIDS; i++) {
      this.addObject(new Asteroids.Asteroid(this.randomPosition(), this))
    }
  }

  Game.prototype.addObject = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj)
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj)
    } else if (obj instanceof Asteroids.ExplodingObject) {
      this.explodingObjects.push(obj)
    }
  }

  Game.prototype.removeObject = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.splice([this.asteroids.indexOf(obj)], 1);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.splice([this.bullets.indexOf(obj)], 1);
    } else if (obj instanceof Asteroids.ExplodingObject) {
      this.explodingObjects.splice([this.explodingObjects.indexOf(obj)], 1)
    }
  }

  Game.prototype.randomPosition = function () {
    pos_x = DIM_X + 50;
    pos_y = Math.random() * DIM_Y;
    return [pos_x, pos_y]
  }

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, DIM_X, DIM_Y);
    this.inputStats(ctx);
    this.allObjects().forEach(function (movingObject) {
      if(movingObject.radius < 0) {
        this.removeObject(movingObject);
      }
      movingObject.draw(ctx);
    }.bind(this));
  }

  Game.prototype.moveObjects = function (ctx) {
    this.allObjects().forEach(function (movingObject) {
      movingObject.statusCheck();
      movingObject.move(ctx);
    });
  }
  //
  // Game.prototype.wrap = function(pos) {
  //   wrappedPos = [pos[0], pos[1]]
  //   if(pos[0] < 0) {
  //     wrappedPos[0] = DIM_X;
  //   }
  //   if(pos[0] > DIM_X) {
  //     wrappedPos[0] = 0;
  //   }
  //   if(pos[1] > DIM_Y) {
  //     wrappedPos[1] = 0;
  //   }
  //   if(pos[1] < 0) {
  //     wrappedPos[1] = DIM_Y;
  //   }
  //
  //   return wrappedPos;
  // }

  Game.prototype.checkCollisions = function() {
    var thisGame = this;
    this.allObjects().forEach(function(obj1){
      thisGame.allObjects().forEach(function(obj2){
        if((obj1 !== obj2) && obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2)
        }
      })
    })
  }

  Game.prototype.step = function() {
    this.checkGame();
    this.moveObjects()
    this.checkCollisions()
  }

  Game.prototype.checkGame = function() {
    if (this.lives < 1) {
      clearInterval(this.interval)
      Asteroids.Util.loadNonGame(this.points)
    }
  }

  Game.prototype.isHittingWall = function(obj) {
    return ((obj.pos[1] - obj.radius) < 0 || (obj.pos[1] + obj.radius) > DIM_Y)
  }

  Game.prototype.clearedAreaLeft = function(obj) {
    return (obj.pos[0] < (0 - obj.radius))
  }
  Game.prototype.clearedAreaRight = function(obj) {
    return (obj.pos[0] > (DIM_X + obj.radius))
  }

  Game.prototype.inputStats = function(ctx) {
    ctx.font = "20px monospace";
    ctx.fillStyle = "#FFF"
    var stats =
    stats += "Points: " + this.points + "</br>"
    stats += "Ammo: " + (BULLET_COUNT - this.bullets.length)
    ctx.fillText("Lives: " + this.lives, 10, 50);
    ctx.fillText("Points: " + this.points, 10, 80);
    //ctx.fillText("Ammo: " + (BULLET_COUNT - this.bullets.length), 10, 110);
  }

  Game.prototype.increaseDifficulty = function() {
    this.difficulty += 1;
  }

  Game.prototype.sendInMoreAsteroids = function() {
    window.clearInterval(this.newAsteroidInterval);
    this.newAsteroidInterval = root.setInterval((function() {
      var numAsteroids = Math.ceil(this.difficulty / 2)
      for(var i = 0; i < numAsteroids; i++) {
        if(this.asteroids.length < 60) {
          var newAsteroid = new Asteroids.Asteroid(this.randomPosition(), this);
          this.addObject(newAsteroid);
        }
      }
    }).bind(this), (-2 * this.difficulty + 1000));
  }


})(window);
