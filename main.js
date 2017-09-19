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
	this.x_position = canvas.width / 2;
	this.y_position = canvas.height / 2;
	this.radius =10;
	this.start_angle = 0;
	this.end_angle = 2 * Math.PI;
  this.speed = 2;
  this.angle = Math.random(0, (2 * Math.PI));
  this.x_direction = Math.cos(this.angle); 
  this.y_direction = Math.sin(this.angle);
}

Ball.prototype.render = function() {
	context.beginPath();
	context.arc(this.x_position, this.y_position, this.radius, this.start_angle, this.end_angle, true);
	context.fillStyle = 'white';
	context.fill();
}

Ball.prototype.update = function() {
  this.x_left = this.x_position - this.radius;
  this.x_right = this.x_position + this.radius;
  this.y_top = this.y_position - this.radius;
  this.y_bottom = this.y_position + this.radius;
  context.clearRect(0, 0, canvas.width, canvas.height);
  this.x_position += (this.speed * this.x_direction);
  this.y_position += (this.speed * this.y_direction);
  
  // Wall detection
  if (this.y_bottom > canvas.height) {
    this.y_direction = this.y_direction * -1;
    this.y_position = 590;
  } else if (this.y_top < 0) {
    this.y_direction = this.y_direction * -1;
    this.y_position = 10;
  } 
  // Paddle detection
  var paddle;
  if (this.x_direction < 0) {
    paddle = computer;
  } else {
    paddle = playerOne;
  }
  if (this.x_right > 675) {
    if (this.y_position >= paddle.y_position && this.y_position <= (paddle.y_position + paddle.height)) {
      this.x_direction = this.x_direction * -1;
      this.x_position = 665;
    }
  } else if (this.x_left < 65) {
    if (this.y_position >= paddle.y_position && this.y_position <= (paddle.y_position + paddle.height)) {
      this.x_direction = this.x_direction * -1;
      this.x_position = 75;
    }
  }
}

function renderBoard() {
  gameBall.update();
  gameBall.render();
	playerOne.render();
	computer.render();
}

function keyDown(key) {
  if (key.keyCode == 38) { //press up key
    if (playerOne.y_position >= 25) {
      playerOne.move(-20)
    }
  }
  else if (key.keyCode == 40) { //press down key
    if (playerOne.y_position <= 475) {
      playerOne.move(20)
    }
  }
}

var computer = new Paddle(50, 250);
var playerOne = new Paddle(675, 250);
var gameBall = new Ball();


window.addEventListener("keydown", keyDown, true);

