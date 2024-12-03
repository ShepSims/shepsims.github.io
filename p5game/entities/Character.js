class Character {
	constructor(x, y) {
		this.position = { x, y };
		this.velocity = { x: 0, y: 0 };
		this.ammo = 10;
		this.shotClock = 0;
		this.lasers = [];
		this.charge = false;
		this.gravity = 0.5; // Gravity effect
		this.jumpStrength = 10; // Jump strength
		this.speed = 5; // Movement speed
		this.width = 50; // Character width for collision detection
		this.height = 50; // Character height for collision detection
		this.onGround = false; // Check if the character is on the ground
	}

	move() {
		// Handle horizontal movement
		if (keyIsDown(LEFT_ARROW)) {
			this.position.x -= this.speed;
		}
		if (keyIsDown(RIGHT_ARROW)) {
			this.position.x += this.speed;
		}

		// Handle vertical movement (jumping)
		if (this.onGround && keyIsDown(UP_ARROW)) {
			this.velocity.y = -this.jumpStrength; // Jump
			this.onGround = false; // Set onGround to false when jumping
		}

		// Apply gravity
		this.velocity.y += this.gravity;
		this.position.y += this.velocity.y;

		// Check for ground collision (simple ground check)
		if (this.position.y >= height - this.height) {
			this.position.y = height - this.height; // Reset position to ground level
			this.velocity.y = 0; // Reset vertical velocity
			this.onGround = true; // Set onGround to true
		}
	}

	fire() {
		if (this.ammo > 0 && this.shotClock < 1) {
			const projectile = new Projectile(this.position.x + this.width / 2, this.position.y, 0, -5, 25); // Create a projectile
			this.lasers.push(projectile);
			this.ammo--; // Decrease ammo
			this.shotClock = 10; // Reset shot clock
		}
	}

	update() {
		this.move(); // Update movement
		this.shotClock--; // Decrease shot clock
		// Update lasers
		for (let i = this.lasers.length - 1; i >= 0; i--) {
			this.lasers[i].update();
			if (!this.lasers[i].isAlive()) {
				this.lasers.splice(i, 1); // Remove dead lasers
			}
		}
	}

	draw() {
		fill(0, 255, 0); // Character color (green)
		rect(this.position.x, this.position.y, this.width, this.height); // Draw character
	}

	collidesWith(pickup) {
		return (
			this.position.x < pickup.x + pickup.size &&
			this.position.x + this.width > pickup.x &&
			this.position.y < pickup.y + pickup.size &&
			this.position.y + this.height > pickup.y
		);
	}
}
