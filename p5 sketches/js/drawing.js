let Drawing = function (verts) {
	this.points = [];
	this.currentEdge = 0;
	this.distance = 0;
};

Drawing.prototype.addPoint = function () {
	this.points.push(createVector(mouseX, mouseY));
	console.log(this.points);
};

Drawing.prototype.draw = function () {
	d = 0;
	for (p in this.points) {
		next = p < this.points.length - 1 ? int(int(p) + 1) : 0;

		d += sqrt(
			(this.points[p].x - this.points[next].x) * (this.points[p].x - this.points[next].x) +
				(this.points[p].y - this.points[next].y) * (this.points[p].y - this.points[next].y)
		);
	}
	this.totalDistance = d;
	pen = new Pen();
	pen.speed = 0.01;
	for (let p = 0; p < this.points.length; p++) {
		console.log(this.points[p], this.points[p + 1]);
		pen.position = this.points[p];
		pen.goTo(this.points[p + 1]);
		while (!pen.isNearDestination()) {
			pen.update();
		}
	}
};
