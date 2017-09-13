var animate = window.requestAnimationFrame || 
  function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');


window.onload = function() {
  animate(step);
}

function step() {
  renderBoard();
  animate(step);
}

function Paddle(x_position, y_position) {
	this.x_position = x_position;
	this.y_position = y_position;
	this.width = 15;
	this.height = 100;
}

Paddle.prototype.render = function() {
	context.beginPath();
	context.rect(this.x_position, this.y_position, this.width, this.height);
	context.fillStyle = 'white';
	context.fill();
}

Paddle.prototype.move = function(y_change) {
  context.clearRect(this.x_position, this.y_position, this.width, this.height)
  this.y_position += y_change;
}

function Ball() {
	this.x = canvas.width / 2;
	this.y = canvas.height / 2;
	this.radius =10;
	this.start_angle = 0;
	this.end_angle = 2 * Math.PI;

	context.beginPath();
	context.arc(this.x, this.y, this.radius, this.start_angle, this.end_angle, true);
	context.fillStyle = 'white';
	context.fill();
}

Ball.prototype.render = function() {
	context.beginPath();
	context.arc(this.x, this.y, this.radius, this.start_angle, this.end_angle, true);
	context.fillStyle = 'white';
	context.fill();
}

function renderBoard() {
	gameBall.render();
	playerOne.render();
	computer.render();
}

function keyDown(key) {
  if (key.keyCode == 38) { //up key
    if (playerOne.y_position >= 25) {
      playerOne.move(-10)
    }
  }
  else if (key.keyCode == 40) { //down key
    if (playerOne.y_position <= 475) {
      playerOne.move(10)
    }
  }
}

var playerOne = new Paddle(50, 50);
var computer = new Paddle(675, 50);
var gameBall = new Ball();


window.addEventListener("keydown", keyDown, true);

