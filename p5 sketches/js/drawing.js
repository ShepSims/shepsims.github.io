let Drawing = function (verts) {
	this.points = [];
	this.currentEdge = 0;
	this.distance = 0;
};

Drawing.prototype.addPoint = function () {
	this.points.push(createVector(mouseX, mouseY));
	console.log(this.points);
};
