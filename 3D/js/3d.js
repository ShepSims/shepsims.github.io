window.location.hash = 'gravity';

let img;
let angle = 0;
let fontsize = 20;

function preload() {
	img1 = loadImage('../src/bc1.jpeg');
	img2 = loadImage('../src/bc2.jpeg');
	f = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf');
}

function setup() {
	linkPosition = createVector(-windowWidth * 0.5 + 50, -windowHeight * 0.5 + 100);
	angleMode('degrees');
	if (windowWidth * 0.875 < windowHeight * 0.5) {
		cardWidth = windowWidth * 0.875;
		cardHeight = windowWidth * 0.5;
	} else {
		cardWidth = windowHeight * 0.875;
		cardHeight = windowHeight * 0.5;
	}
	img1.resize(cardWidth, cardHeight);
	img2.resize(cardWidth, cardHeight);
	img = img1;
	canvas = createCanvas(windowWidth, windowHeight, WEBGL);
	textFont(f, fontsize);
}

function moveText() {
	if (angle < 50) {
		linkPosition.x = -windowWidth * 0.5 + 50;
		linkPosition.y = -windowHeight * 0.5 + 100;
	} else if (angle < 100) {
		linkPosition.x = windowWidth * 0.5 - 50;
		linkPosition.y = windowHeight * 0.5 - 100;
	} else if (angle < 150) {
		linkPosition.x = -windowWidth * 0.5 + 100;
		linkPosition.y = -windowHeight * 0.5 + 400;
	} else if (angle < 200) {
		linkPosition.x = windowWidth * 0.5 - 150;
		linkPosition.y = windowHeight * 0.5 - 500;
	} else if (angle < 250) {
		linkPosition.x = -windowWidth * 0.5 + 200;
		linkPosition.y = -windowHeight * 0.5 + 800;
	} else if (angle < 300) {
		linkPosition.x = windowWidth * 0.5 - 250;
		linkPosition.y = windowHeight * 0.5 - 1000;
	}
}

function draw() {
	moveText();
	background(0);
	push();
	rotateY((angle += 1.5));
	if (angle == 90) {
		img = img2;
	} else if (angle == 270) {
		img = img1;
	} else if (angle == 360) {
		angle = 0;
	}
	image(img, -cardWidth * 0.5, -cardHeight * 0.5);
	pop();
	rect;
	text('Click Me!!!', linkPosition.x, linkPosition.y);

	// text('P5', -windowWidth * 0.5 + 50, -windowHeight * 0.5 + 140);
	// text('Python', -windowWidth * 0.5 + 50, -windowHeight * 0.5 + 160);
	// text('JavaScript', -windowWidth * 0.5 + 50, -windowHeight * 0.5 + 180);
	// text('GraphQL', -windowWidth * 0.5 + 50, -windowHeight * 0.5 + 200);
	// text('AWS', -windowWidth * 0.5 + 50, -windowHeight * 0.5 + 220);
	// text('Google Apps Script', -windowWidth * 0.5 + 50, -windowHeight * 0.5 + 240);
}

// function mousePressed() {
// 	mouseButton == LEFT ? (system.growthRate += 0.1) : (system.growthRate -= 0.1);
// }

function keyPressed() {
	if (keyCode == RIGHT_ARROW) {
	}
	if (keyCode == LEFT_ARROW) {
	}
	if (key == 's') {
		save('drawing.jpg');
	}
	if (key == 'r') {
	}
	// if (keyCode == DOWN_ARROW) {
	// }
	// console.log(system.radius);
	// function mouseWheel(event) {
	// 	window.location.href = '..../groceries/html/groceries.html';
	// 	//copy(get(), 0, 0, width + event.delta / abs(event.delta), height, event.delta / abs(event.delta), 0, width, height);
}

function mousePressed() {
	console.log(mouseX, mouseY, linkPosition.x + windowWidth * 0.5, linkPosition.y + windowHeight * 0.5);
	if (
		mouseY >= linkPosition.y + windowHeight * 0.5 - fontsize && // -20 because the font size is set to 20 px tall
		mouseY <= linkPosition.y + windowHeight * 0.5 && // do not need to go below word, so no adjustments here
		mouseX >= linkPosition.x + windowWidth * 0.5 && // do not need to go in front of word, so no adjustments here
		mouseX <= linkPosition.x + windowWidth * 0.5 + 11 * fontsize * 0.6 // assume the average letter width is ~.6 of its height
	) {
		console.log('mouseY', mouseY, 'mouseX', mouseX, '\nlinkY', linkPosition.y + windowHeight * 0.5, 'linkX', linkPosition.x + windowWidth * 0.5);
		//range accounting for text length
		window.open('http://shep.blog');
	}
}
