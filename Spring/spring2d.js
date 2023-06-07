let bob;
let anchor;
let y = 200;
let restLength = 200;
let k = 0.01;

function setup() {
	createCanvas(600, 400);
	bob = createVector(300, 250);
	anchor = createVector(300, 0);
	force = createVector(0, 0);
	velocity = createVector(0, 0);
}

function draw() {
	// p5.Vector.sub is a built in function that returns
	// the vector from subtracting 2 other vectors

	force = p5.Vector.sub(bob, anchor);

	// to get unit vector
	let x = force.mag() - restLength;
	force = force.normalize();
	force.mult(-k * x);

	background(0);
	noStroke();
	fill(255);
	circle(bob.x, bob.y, 100);
	circle(anchor.x, anchor.y, 50);

	// F=A
	velocity.add(force);
	bob.add(velocity);
	velocity.mult(0.99);
}
