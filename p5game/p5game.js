function setup() {
	canvas = createCanvas(windowWidth - 50, windowHeight - 50);

	// image(img, 0, 0);
	character = new Character(50, 50);
	lineCoords = [25, windowHeight - 150, 150, windowHeight - 150];
	rectMode(CORNERS);
	door = [windowWidth - 130, windowHeight - 750, windowWidth - 75, windowHeight - 850];
	doorknob = [windowWidth - 120, windowHeight - 800];
	trampoline = [350, windowHeight - 450, 600, windowHeight - 475];
	angleMode(DEGREES);
	angle = 0;
	x = 0;
	y = 0;
	won = false;
	textSize(30);
}

function draw() {
	background(255);

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
		if (inContact(door[0], door[1], door[2], door[3], character.position.x, character.position.y)) {
			// window.location.href = '../gravity/html/gravity.html';
			won = true;
		}
		if (inContact(trampoline[0], trampoline[1], trampoline[2], trampoline[3], character.position.x, character.position.y)) {
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
		// 'A' key
		a = { x: -3, y: 0 };
		if (character.shotClock < 1) {
			character.fire({ ...a, life: 1000 });
		}
	}
	if (keyIsDown(87)) {
		// 'W' key
		a = { x: -3, y: 0 };
		if (character.shotClock < 1) {
			character.fire({ ...a, life: 1000 });
		}
	}
	if (keyIsDown(83)) {
		// 'S' key
		a = { x: 0, y: -3 };
		if (character.shotClock < 1) {
			character.fire({ ...a, life: 1000 });
		}
	}
	if (keyIsDown(68)) {
		// 'D' key
		a = { x: 3, y: 0 };
		if (character.shotClock < 1) {
			character.fire({ ...a, life: 1000 });
		}
	}

	character.charge = keyIsDown(32);
	background(255);
	if (onLine && !keyIsDown(UP_ARROW)) {
		character.position.y = lineCoords[1];
	}

	// Draw the door
	fill(255, 0, 0); // Change color to red

	rect(door[0], door[1], door[2], door[3]);
	fill(0, 0, 0); // Change color to red

	circle(doorknob[0], doorknob[1], 5);
	rect(trampoline[0], trampoline[1], trampoline[2], trampoline[3]);

	// Define the ammo pickup
	let ammoPickup = {
		x: (3 * windowWidth) / 4, // X position of the ammo pickup (adjusted to be within the screen)
		y: windowHeight - 200, // Y position of the ammo pickup (adjusted to be within the screen)
		size: 25, // Size of the ammo pickup
		visible: true, // Track visibility of the ammo pickup
	};

	// Draw the ammo pickup
	if (ammoPickup.visible) {
		fill(0, 0, 255); // Change color to blue
		rectMode(CENTER);
		rect(ammoPickup.x, ammoPickup.y, ammoPickup.size, ammoPickup.size); // Ensure width and height are both 25
		rectMode(CORNERS);
		fill(0, 0, 0); // Change color to blue
	}

	// Check for collision with the ammo pickup
	if (
		character.position.x < ammoPickup.x + ammoPickup.size &&
		character.position.x + 50 > ammoPickup.x && // Assuming character width is 50
		character.position.y < ammoPickup.y + ammoPickup.size &&
		character.position.y + 50 > ammoPickup.y
	) {
		// Assuming character height is 50
		character.ammo += 5; // Refill ammo (adjust the amount as needed)
		ammoPickup.visible = false; // Make the pickup disappear

		// Regenerate the ammo pickup after 2.5 seconds
		setTimeout(() => {
			ammoPickup.visible = true; // Make the pickup visible again
		}, 2500); // 2500 milliseconds = 2.5 seconds
	}

	character.position.y += character.velocity.y;
	renderCharacter(character.position.x, character.position.y);
	line(lineCoords[0], lineCoords[1], lineCoords[2], lineCoords[3]);
	menu = keyIsDown(72);
	if (!won) {
		text('Enter through the door to move on!', windowWidth / 2 - 100, (windowHeight - 100) / 2);
	} else {
		text('YOU WIN!', windowWidth / 2 - 100, (windowHeight - 100) / 2);
	}

	// Display the ammo counter
	fill(0); // Set the color for the text (black)
	textSize(20); // Set the text size
	text(`Ammo: ${character.ammo}`, 10, 30); // Display the ammo count at (10, 30)

	// Draw the projectiles
	for (let i = 0; i < character.lasers.length; i++) {
		let laser = character.lasers[i];
		fill(255, 0, 0); // Color of the projectile (red)
		ellipse(laser.x, laser.y, 5, 5); // Draw the projectile as a small circle

		// Update the position of the laser
		laser.x += laser.xv;
		laser.y += laser.yv;

		// Decrease the life of the laser
		laser.life--;

		// Remove the laser if its life is over
		if (laser.life <= 0) {
			character.lasers.splice(i, 1);
			i--; // Adjust index after removal
		}
	}

	// Reset fill color for other drawings
	fill(0); // Reset to black or any other color you want for other elements
}

function getDistance(xA, yA, xB, yB) {
	xDiff = xA - xB;
	yDiff = yA - yB;

	return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

function inContact(dx1, dy1, dx2, dy2, px, py) {
	if (px > dx1 && px < dx2 && py < dy1 && py > dy2) {
		return true;
	}

	return false;
}

function drawSpheres(posX, posY) {
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

function renderCharacter(posX, posY) {
	drawSpheres(posX, posY);
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
