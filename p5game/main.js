let currentLevel;

function setup() {
	createCanvas(windowWidth, windowHeight);
	loadLevel(1);
}

function draw() {
	background(255);

	// Update and draw the character
	currentLevel.character.update();
	currentLevel.character.draw();

	// Update and draw the pickups
	currentLevel.ammoPickup.draw();

	// Check for collision with the ammo pickup
	if (currentLevel.ammoPickup.visible && currentLevel.character.collidesWith(currentLevel.ammoPickup)) {
		currentLevel.ammoPickup.collect(currentLevel.character);
	}

	// Update and draw projectiles
	for (let i = 0; i < currentLevel.character.lasers.length; i++) {
		let laser = currentLevel.character.lasers[i];
		laser.update();
		laser.draw();
		if (!laser.isAlive()) {
			currentLevel.character.lasers.splice(i, 1);
			i--; // Adjust index after removal
		}
	}

	// Check for winning condition (example)
	if (currentLevel.character.position.x > currentLevel.door.x) {
		textSize(32);
		fill(0);
		text('YOU WIN!', width / 2 - 100, height / 2);
	}
}

function loadLevel(levelNumber) {
	if (levelNumber === 1) {
		currentLevel = setupLevel1();
	}
	// Load other levels as needed
}
