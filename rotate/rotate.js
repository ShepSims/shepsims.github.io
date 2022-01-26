window.location.hash = 'rotation';
function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	angle = 0;
	x = 0;
	y = 0;
	noCursor();
}

function draw() {
	x = x + 1;
	y = y + 1;
	push();
	setCenter(mouseX + sin(x), mouseY + sin(y));
	stroke(255);
	fill(0);
	setCenter();
	rotate(angle);
	fill(255);
	circle(0, 0, 100);
	fill(0);
	rectMode(CENTER);
	//start
	push();
	rotate(angle);
	translate(-20, -20);
	circle(0, 0, 150, 150);
	translate(20, 20);

	translate(-20, -20);
	circle(0, 0, 20, 20);

	rotate(180);
	circle(0, 0, 20, 20);
	translate(20, 20);

	rotate(-angle);
	pop();
	//end
	circle(0, 0, 50, 50);
	rotate(-2 * angle);
	circle(0, 0, 20, 20);
	translate(13, 13);
	circle(0, 0, 15, 15);
	translate(-13, -13);
	rotate(90);
	rotate(-90);
	translate(100, 0);

	line(50 * cos(angle), 50 * sin(angle), cos(angle % 50), 100 * sin(angle));
	line(50 * sin(angle), 50 * sin(angle), sin(-angle % 50), 100 * sin(angle));
	line(50 * sin(angle), 50 * sin(angle), cos(angle % 50), 100 * sin(angle));
	line(50 * cos(angle), 50 * cos(-angle), cos(angle % 50), 100 * sin(angle));
	line(50 * cos(angle), 50 * sin(-angle), cos(angle % 50), 100 * sin(angle));

	pop();

	angle++;
}

function setCenter(a, b) {
	translate(a, b);
}

function mouseWheel(event) {
	console.log(event.delta);
	copy(get(), 0, 0, width + event.delta / abs(event.delta), height, event.delta / abs(event.delta), 0, width, height);
}
function keyPressed() {
	if (key == 'q') {
		window.location.href = '../../index.html';
	}
}
