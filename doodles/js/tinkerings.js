window.location.hash = 'drawing';

function setup() {
	// Create a new canvas to render our grocery shopping expirience

	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);

	// Dark mode is coo
	background(0);
	fill(255);
	stroke(255);
	i = 4;
	current = new Drawing();
	pen = new Pen();
}

// resize store if user changes window size
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

// draw
function draw() {
	d = 0;
	for (p in current.points) {
		next = p < current.points.length - 1 ? int(int(p) + 1) : 0;

		d += sqrt(
			(current.points[p].x - current.points[next].x) * (current.points[p].x - current.points[next].x) +
				(current.points[p].y - current.points[next].y) * (current.points[p].y - current.points[next].y)
		);
	}
	current.totalDistance = d;

	pen.speed = 0.5;
	for (let p = 0; p < current.points.length - 1; p++) {
		pen.position = current.points[p];
		pen.goTo(current.points[p + 1]);
		while (!pen.isNearDestination()) {
			pen.update();
			console.log('here');
		}
	}
}

function mousePressed() {
	current.addPoint();
}

function keyPressed() {
	if (key == 'c') {
		background(0);
	}
	if (key == 's') {
		save('drawing.jpg');
	}
}
