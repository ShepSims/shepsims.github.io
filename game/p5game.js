// function preload() {
// 	img = loadImage('assets/gradient.png');
// }

function setup() {
	// image(img, 0, 0);
	bull = new Bull(50, 50);
}

function draw() {
	bull.shotClock -= 1;
	bull.position.x = keyIsDown(LEFT_ARROW) ? bull.position.x : bull.position.x - 1;

	bull.position.x = keyIsDown(RIGHT_ARROW) ? bull.position.x : bull.position.x + 1;

	bull.moveUp = keyIsDown(UP_ARROW) ? bull.position.y : bull.position.y + 1;

	bull.moveDown = keyIsDown(DOWN_ARROW) ? bull.position.y : bull.position.y - 1;

	if (keyIsDown(65)) {
		a = { x: -1, y: 0 };
		if (bull.shotClock < 1) {
			fire(a);
		}
	}
	if (keyIsDown(87)) {
		a = { x: -1, y: 0 };
		if (bull.shotClock < 1) {
			fire(a);
		}
	}
	if (keyIsDown(83)) {
		a = { x: 0, y: -1 };
		if (bull.shotClock < 1) {
			fire(a);
		}
	}
	if (keyIsDown(68)) {
		a = { x: 1, y: 0 };
		if (bull.shotClock < 1) {
			fire(a);
		}
	}
	circle(bull.position.x, bull.position.y);
	bull.charge = keyIsDown(32);
	background(255);
	menu = keyIsDown(72);
}
