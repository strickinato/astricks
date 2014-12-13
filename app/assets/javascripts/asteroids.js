$(function () {

  var canvasEl = document.getElementsByTagName("canvas")[0];
  var ctx = canvasEl.getContext('2d');
  canvasEl.height = window.innerHeight;
  canvasEl.width = window.innerWidth;
  var game = new Asteroids.Game()
  var gameView = new Asteroids.GameView(game, ctx);
  gameView.start();


});
