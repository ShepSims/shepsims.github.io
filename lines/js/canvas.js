window.location.hash = 'gravity';

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);

	r = 255;
	g = 255;
	b = 255;
	resetdelay = 0;
	play = true;
	menu = false;
	start = true;
	c = true;
	BACKGROUND = 0;
	background(BACKGROUND);
	noCursor();
	x = 0;
	up = true;
	system = new System();
	lockBig = false;

	for (let x = 0; x < windowWidth; x += 50) {
		for (let y = 0; y < windowHeight; y += 50) {
			system.addParticle(x, y);
		}
	}
}

function draw() {
	background(0);
	system.run();
	x++;
	if (keyIsDown(UP_ARROW)) {
		// system.radius += 3;
	}

	if (keyIsDown(DOWN_ARROW)) {
		// system.radius -= 3;
		console.log('hi');
	}
	if (lockBig == false) {
		if (up == true) {
			if (system.radius > 350) {
				up = false;
				system.radius -= 5;
			} else {
				system.radius += 15;
			}
		} else {
			if (system.radius < 125) {
				up = true;
				system.radius += 80;
			} else {
				system.radius -= 10;
			}
		}
	} else {
		system.radius = 500;
	}
}

// function mousePressed() {
// 	mouseButton == LEFT ? (system.growthRate += 0.1) : (system.growthRate -= 0.1);
// }

function keyPressed() {
	if (keyCode == RIGHT_ARROW) {
		lockBig = true;
	}
	if (keyCode == LEFT_ARROW) {
		lockBig = false;
	}
	if (key == 's') {
		save('drawing.jpg');
	}
	if (key == 'r') {
		system = new System();

		for (let x = 0; x < windowWidth; x += 50) {
			for (let y = 0; y < windowHeight; y += 50) {
				system.addParticle(x, y);
			}
		}
	}
	// if (keyCode == DOWN_ARROW) {
	// }
	// console.log(system.radius);
	// function mouseWheel(event) {
	// 	window.location.href = '..../groceries/html/groceries.html';
	// 	//copy(get(), 0, 0, width + event.delta / abs(event.delta), height, event.delta / abs(event.delta), 0, width, height);
}
