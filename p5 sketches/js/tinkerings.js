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
	shapes = [new Shape(i)];
}

// resize store if user changes window size
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

// draw
function draw() {
	for (s in shapes) {
		shapes[s].move(createVector(mouseX, mouseY));
	}
}

function mousePressed() {
	shapes.push(new Shape(i));
}

function keyPressed() {
	if (key == 'c') {
		background(0);
	}
}
