let Pen = function () {
	this.position = createVector(mouseX, mouseY);
	this.destination = createVector(mouseX, mouseY);
	this.speed = 0;
	this.distanceFromSystem = 0;
	this.angleFromDestination = 0;
};

Pen.prototype.update = function () {
	this.dx = this.position.x - this.destination.x;
	this.dy = this.position.y - this.destination.y;

	let prevPosition = createVector(this.position.x, this.position.y);

	let angle = atan2(this.dy, this.dx);

	xVelocity = -this.speed * cos(angle);
	yVelocity = -this.speed * sin(angle);
	this.position.x = this.position.x + xVelocity;
	this.position.y = this.position.y + yVelocity;

	line(this.position.x, this.position.y, prevPosition.x, prevPosition.y);
};

Pen.prototype.goTo = function (dest) {
	this.destination = dest;
};
