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
}

// resize store if user changes window size
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

// draw
// function draw() {
// }

function mousePressed() {
	current.addPoint();
}

function keyPressed() {
	if (key == 'c') {
		background(0);
	}
	if (key == 'g') {
		current.draw();
	}
}
