let y = 200;
let restLength = 200;
let k = 0.01;
function setup() {
	createCanvas(600, 400);
	velocity = 2;
}

function draw() {
	background(0);
	noStroke();
	fill(255);
	circle(300, y, 200);
	let x = y - restLength;
	let force = -k * x; // Spring equation

	// F=A
	velocity += force;
	y += velocity;
}
