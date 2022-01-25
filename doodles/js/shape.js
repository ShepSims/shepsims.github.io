let Shape = function (verts) {
	this.pen = new Pen();
	this.position = createVector(mouseX, mouseY);
	this.points = [];
	this.shape = verts;
	this.steps = 0;
	this.shapePoints = [];

	r = 200;
	angle = 0;
	step = TWO_PI / this.shape;

	for (let s = 0; s < this.shape; s++) {
		x = r * sin(angle);
		y = r * cos(angle);
		p = createVector(x, y);
		this.points.push(p);
		this.shapePoints.push(createVector(p.x + mouseX, p.y + mouseY));
		angle = angle + step;
		console.log(sin(angle));
	}

	this.pen.position = this.points[0];

	this.nextPoint = 0;

	next = 0;
	d = 0;
	for (p in this.points) {
		next = p < this.points.length - 1 ? int(int(p) + 1) : 0;

		d += sqrt(
			(this.points[p].x - this.points[next].x) * (this.points[p].x - this.points[next].x) +
				(this.points[p].y - this.points[next].y) * (this.points[p].y - this.points[next].y)
		);
	}
	this.totalDistance = d;
	this.distanceTraveled = 0;
	this.pen.speed = this.totalDistance / 200;
};

Shape.prototype.move = function (point) {
	this.moveCenter(point);

	if (this.distanceTraveled < this.totalDistance / this.shape) {
		this.pen.update();
		this.distanceTraveled += this.totalDistance / 200;
	} else {
		this.distanceTraveled = 0;
		this.nextPoint = this.nextPoint < this.shapePoints.length - 1 ? this.nextPoint + 1 : 0;
		this.pen.goTo(this.shapePoints[this.nextPoint]);
	}
};

Shape.prototype.moveCenter = function (point) {
	for (let i in this.points) {
		this.shapePoints[i] = createVector(this.points[i].x + point.x, this.points[i].y + point.y);
	}
};
