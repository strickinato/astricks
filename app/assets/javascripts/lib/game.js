(function (root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  DIM_X = window.innerWidth;
  DIM_Y = window.innerHeight;
  NUM_ASTEROIDS = 5;
  BULLET_COUNT = 20;

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets = [];
    this.explodingObjects = [];
    this.bonuses = [];
    this.ship = new Asteroids.Ship(this)
    this.addAsteroids();
    this.lives = 3;
    this.points = 0;
    this.difficulty = 1;
  }

  Game.prototype.allObjects = function() {
    var allObjects = this.asteroids.slice(0)
    allObjects = allObjects.concat(this.ship).concat(this.bullets).concat(this.explodingObjects).concat(this.bonuses);
    return allObjects
  }

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < NUM_ASTEROIDS; i++) {
      this.addObject(new Asteroids.Asteroid(this.randomPosition(), 0, this))
    }
  }

  Game.prototype.addObject = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj)
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj)
    } else if (obj instanceof Asteroids.ExplodingObject) {
      this.explodingObjects.push(obj)
    } else {
      this.bonuses.push(obj)
    }
  }

  Game.prototype.removeObject = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.splice([this.asteroids.indexOf(obj)], 1);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.splice([this.bullets.indexOf(obj)], 1);
    } else if (obj instanceof Asteroids.ExplodingObject) {
      this.explodingObjects.splice([this.explodingObjects.indexOf(obj)], 1);
    } else {
      this.bonuses.splice([this.bonuses.indexOf(obj)], 1);
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

  Game.prototype.checkCollisions = function() {
    var thisGame = this;
    this.asteroids.forEach(function(asteroid){
      thisGame.bullets.forEach(function(bullet){
        if(asteroid.isCollidedWith(bullet)) {
          bullet.collideWith(asteroid)
        }
      });
      if(asteroid.isCollidedWith(thisGame.ship)) {
        asteroid.collideWith(thisGame.ship)
      }
    });
    this.bonuses.forEach(function(bonus){
      if(bonus.isCollidedWith(thisGame.ship)){
        bonus.collideWith(thisGame.ship)
      }
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
  }

  Game.prototype.increaseDifficulty = function() {
    if (this.difficulty < 20) {
      this.difficulty += 1;
    }
  }

  Game.prototype.sendInMoreAsteroids = function() {
    window.clearInterval(this.newAsteroidInterval);
    this.newAsteroidInterval = root.setInterval((function() {
      var numAsteroids = Math.ceil(this.difficulty / 2)
      if (numAsteroids > 8) {
        numAsteroids = 8
      }
      for(var i = 0; i < numAsteroids; i++) {
        var newAsteroid;
        if(Math.floor(Math.random() * 200) == 1) {
          newAsteroid = new Asteroids.ExtraLife(this.randomPosition(), this);
        } else {
          var mod = (this.difficulty / 3.0);
          newAsteroid = new Asteroids.Asteroid(this.randomPosition(), mod, this);
        }
        this.addObject(newAsteroid);
      }
    }).bind(this), (1000));
  }


})(window);
