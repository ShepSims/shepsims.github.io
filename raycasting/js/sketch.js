let walls = [];

const sceneW = 800;
const sceneH = 800;

function setup() {
	createCanvas(1600, 800);

	// Set Random Boundaries
	for (let i = 0; i < 5; i++) {
		x1 = random(sceneW);
		x2 = random(sceneW);
		y1 = random(sceneH);
		y2 = random(sceneH);
		walls[i] = new Wall(x1, y1, x2, y2);
	}

	// Set edges of screen as walls
	walls.push(new Wall(0, 0, sceneW, 0));
	walls.push(new Wall(sceneW, 0, sceneW, sceneH));
	walls.push(new Wall(sceneW, sceneH, 0, sceneH));
	walls.push(new Wall(0, sceneH, 0, 0));

	particle = new Particle();

	// sprite = new Sprite();

	// sliderFOV = createSlider(0, 360, 45);
	// sliderFOV.input(changeFOV);

	spriteSliderFOV = createSlider(0, 360, 45);
	spriteSliderFOV.input(changeSpriteFOV);

	sliderDensity = createSlider(0.05, 3, 1, 0.05);
	sliderDensity.input(changeDensity);
}

function changeFOV() {
	const fov = sliderFOV.value();
	particle.updateFOV(fov);
}

function changeSpriteFOV() {
	const fov = spriteSliderFOV.value();
	// sprite.updateFOV(fov);
}

function changeDensity() {
	const d = sliderDensity.value();
	particle.updateDensity(d);
}

function draw() {
	background(0);

	if (keyIsDown(LEFT_ARROW)) {
		particle.rotate(0.01);
	} else if (keyIsDown(RIGHT_ARROW)) {
		particle.rotate(-0.01);
	} else if (keyIsDown(UP_ARROW)) {
		particle.move(2);
	} else if (keyIsDown(DOWN_ARROW)) {
		particle.move(-2);
	}

	// ---------------------------------------------------------------
	//                      Map View
	// ---------------------------------------------------------------

	// Show all walls
	for (let wall of walls) {
		wall.show();
	}
	particle.show();
	// sprite.show();

	// Make particle shine on walls and get array of distances
	const scene = particle.look(walls);
	// sprite.look(walls);

	// Set width of rect so that display gets filled evenly
	const w = sceneW / scene.length;

	// ---------------------------------------------------------------
	//                      First Person View
	// ---------------------------------------------------------------

	// Translate to righthand side and draw
	push();
	translate(sceneW, 0);

	// Map brightness between
	for (let i = 0; i < scene.length; i++) {
		const distance = scene[i];
		noStroke();

		// The further the slice, the lower the brightness
		const b = map(distance, 0, sceneW, 255, 0);

		// The further the slice, the smaller the rect
		const h = map(distance, 0, sceneW, sceneH, 0);

		fill(b);
		rectMode(CENTER);
		rect(i * w + w / 2, sceneH / 2, w, h); // i*w + w/2, sceneH / 2 is center of this sliver's view
	}
	pop();
}
