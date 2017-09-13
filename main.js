var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

context.fillRect(25, 25, 700, 550);
window.onload = function() {
	renderBoard();
}

function Paddle(x_position, y_position) {
	this.x_position = x_position;
	this.y_position = y_position;
	this.width = 25;
	this.height = 100;
}

Paddle.prototype.render = function() {
	context.beginPath();
	context.rect(this.x_position, this.y_position, this.width, this.height);
	context.fillStyle = 'white';
	context.fill();
}

function Ball() {
	this.x = canvas.width / 2;
	this.y = canvas.height / 2;
	this.radius = 25;
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

var playerOne = new Paddle(50, 50);
var computer = new Paddle(675, 50);
var gameBall = new Ball();
