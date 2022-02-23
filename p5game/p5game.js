// function preload() {
// 	img = loadImage('assets/gradient.png');
// }

function setup() {
	canvas = createCanvas(windowWidth - 50, windowHeight - 50);

	// image(img, 0, 0);
	character = new Character(50, 50);
	lineCoords = [25, windowHeight - 150, 150, windowHeight - 150];
	rectMode(CORNERS);
	door = [windowWidth - 150, windowHeight - 750, windowWidth - 75, windowHeight - 850];
	tramp = [350, windowHeight - 450, 600, windowHeight - 475];
	angleMode(DEGREES);
	angle = 0;
	x = 0;
	y = 0;
	won = false;
	textSize(30);
}

function draw() {
	onLine =
		getDistance(lineCoords[0], lineCoords[1], character.position.x, character.position.y) +
			getDistance(lineCoords[2], lineCoords[3], character.position.x, character.position.y) <=
		getDistance(lineCoords[0], lineCoords[1], lineCoords[2], lineCoords[3]) + 5;

	distFromLine =
		getDistance(lineCoords[0], lineCoords[1], character.position.x, character.position.y) +
		getDistance(lineCoords[2], lineCoords[3], character.position.x, character.position.y);

	lineLength = getDistance(lineCoords[0], lineCoords[1], lineCoords[2], lineCoords[3]);

	character.shotClock -= 1;
	character.position.x = keyIsDown(LEFT_ARROW) ? character.position.x : character.position.x + 5;

	character.position.x = keyIsDown(RIGHT_ARROW) ? character.position.x : character.position.x - 5;

	if (character.position.y < windowHeight - 50 && !onLine) {
		character.velocity.y += 0.5;
	} else {
		if (!onLine) character.position.y = windowHeight - 50;

		character.velocity.y = 0;
	}
	if (keyIsDown(UP_ARROW)) {
		if (inDoor(door[0], door[1], door[2], door[3], character.position.x, character.position.y)) {
			// window.location.href = '../gravity/html/gravity.html';
			won = true;
		}
		if (inDoor(tramp[0], tramp[1], tramp[2], tramp[3], character.position.x, character.position.y)) {
			character.velocity.y = -Math.abs(character.velocity.y) - 2;
		} else if (character.position.y != windowHeight - 50 && !onLine) {
			character.velocity.y -= 0.2;
		} else {
			character.velocity.y = -15;
		}
	}

	if (keyIsDown(DOWN_ARROW)) {
		if (character.velocity.y != 0) {
			character.velocity.y += 0.5;
		}
	}

	if (keyIsDown(65)) {
		a = { x: -1, y: 0 };
		if (character.shotClock < 1) {
			fire(a);
		}
	}
	if (keyIsDown(87)) {
		a = { x: -1, y: 0 };
		if (character.shotClock < 1) {
			fire(a);
		}
	}
	if (keyIsDown(83)) {
		a = { x: 0, y: -1 };
		if (character.shotClock < 1) {
			fire(a);
		}
	}
	if (keyIsDown(68)) {
		a = { x: 1, y: 0 };
		if (character.shotClock < 1) {
			fire(a);
		}
	}

	character.charge = keyIsDown(32);
	background(255);
	if (onLine && !keyIsDown(UP_ARROW)) {
		character.position.y = lineCoords[1];
	}

	rect(door[0], door[1], door[2], door[3]);
	rect(tramp[0], tramp[1], tramp[2], tramp[3]);

	character.position.y += character.velocity.y;
	renderCharacter(character.position.x, character.position.y);
	line(lineCoords[0], lineCoords[1], lineCoords[2], lineCoords[3]);
	menu = keyIsDown(72);
	if (!won) {
		text('YOU LOSE!', windowWidth / 2 - 100, (windowHeight - 100) / 2);
	} else {
		text('YOU WIN!', windowWidth / 2 - 100, (windowHeight - 100) / 2);
	}
}

function getDistance(xA, yA, xB, yB) {
	xDiff = xA - xB;
	yDiff = yA - yB;

	return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

function inDoor(dx1, dy1, dx2, dy2, px, py) {
	if (px > dx1 && px < dx2 && py < dy1 && py > dy2) {
		return true;
	}

	return false;
}
function renderCharacter(posX, posY) {
	if (posY < 0) {
		line(posX, 10, posX, -posY / 10);
	}
	x = x + 1;
	y = y + 1;
	push();
	setCenter(posX + sin(x), posY + sin(y));
	stroke(255);
	fill(0);
	setCenter();
	rotate(angle);
	fill(0);
	rectMode(CENTER);
	//start
	push();
	rotate(angle);
	translate(-20, -20);
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
