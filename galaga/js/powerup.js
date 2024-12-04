// powerup.js

class PowerUp {
	constructor(x, y, type) {
		this.x = x;
		this.y = y;
		this.type = type; // e.g., 'bouncyLasers', 'doubleShot', etc.
		this.active = true;
	}

	applyEffect(player) {
		switch (this.type) {
			case 'bouncyLasers':
				player.bounce = true;
				break;
			case 'doubleShot':
				player.doubleShot = true;
				break;
			case 'forkShot':
				player.fork = true;
				break;
			// Add more power-ups here
		}
		this.active = false;
	}

	draw(context) {
		let img = document.getElementById('powerPos1'); // Use appropriate image based on type
		context.drawImage(img, this.x - 15, this.y - 15, 30, 30);
	}
}
