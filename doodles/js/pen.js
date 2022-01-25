let Pen = function () {
	this.position = createVector(mouseX, mouseY);
	this.destination = createVector(mouseX, mouseY);
	this.speed = 1;
	this.distanceTraveled = 0;
	this.distanceFromSystem = 0;
	this.angleFromDestination = 0;
	this.dx = 100;
	this.dy = 100;
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
	this.distanceTraveled += sqrt(
		(this.position.x - prevPosition.x) * (this.position.x - prevPosition.x) +
			(this.position.y - prevPosition.y) * (this.position.y - prevPosition.y)
	);
};

Pen.prototype.goTo = function (dest) {
	this.destination = dest;
};

Pen.prototype.isNearDestination = function () {
	return (
		sqrt(
			(this.position.x - this.destination.x) * (this.position.x - this.destination.x) +
				(this.position.y - this.destination.y) * (this.position.y - this.destination.y)
		) < 3
	);
};
