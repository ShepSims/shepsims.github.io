let anchor;
let restLength = 200;
let k = 0.01;

let particles = [];
let toggle = false;
let count = 0;

var capturer = new CCapture({ format: 'webm', framerate: 60, verbose: true });

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	anchor = createVector(windowWidth / 2, windowHeight / 2);
	for (let x = 0; x < windowWidth; x += 50) {
		for (let y = 0; y < windowHeight; y += 50) {
			let distanceFromAnchor = 0; //p5.Vector.dist(createVector(x, y), anchor) + 50;
			particles.push({ pos: createVector(x, y), velocity: createVector(0, 0), restLength: distanceFromAnchor });
		}
	}
}

function draw() {
	count++;
	background(0);
	if (toggle && count > 5) {
		anchor = createVector(mouseX, mouseY);
	}
	for (let p of particles) {
		// p5.Vector.sub is a built in function that returns
		// the vector from subtracting 2 other vectors
		force = p5.Vector.sub(p.pos, anchor);

		// to get unit vector
		let x = force.mag() - p.restLength;
		force = force.normalize();
		force.mult(-k * x);

		noStroke();
		fill(255);
		circle(p.pos.x, p.pos.y, 10);
		circle(anchor.x, anchor.y, 10);
		// F=A
		p.velocity.add(force);
		p.pos.add(p.velocity);
		p.velocity.mult(0.99);
		// console.log(force);
		line(p.pos.x, p.pos.y, anchor.x, anchor.y);
	}
	capturer.capture(canvas);
}

function mousePressed() {
	anchor = createVector(mouseX, mouseY);
	toggle = !toggle;
}

function keyPressed() {
	if (keyCode == LEFT_ARROW) {
		capturer.start();
	}
	if (keyCode == RIGHT_ARROW) {
		capturer.stop();
		capturer.save();
	}

	// default save, will download automatically a file called {name}.extension (webm/gif/tar)
}
