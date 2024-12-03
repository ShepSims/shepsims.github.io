class Pickup {
	constructor(x, y, size, type) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.type = type;
		this.visible = true;
	}

	draw() {
		if (this.visible) {
			switch (this.type) {
				case 'ammo':
					fill(0, 0, 255);
					break;
				case 'speed':
					fill(255, 255, 0);
					break;
				case 'invincibility':
					fill(255, 0, 255);
					break;
				default:
					fill(0, 255, 0);
			}
			rectMode(CENTER);
			rect(this.x, this.y, this.size, this.size);
			rectMode(CORNERS);
		}
	}

	collect(character) {
		this.visible = false;
		switch (this.type) {
			case 'ammo':
				character.ammo += 5;
				break;
			case 'speed':
				character.speed += 2;
				setTimeout(() => {
					character.speed -= 2;
				}, 5000);
				break;
			case 'invincibility':
				character.invincible = true;
				setTimeout(() => {
					character.invincible = false;
				}, 5000);
				break;
			default:
				break;
		}
		setTimeout(() => {
			this.visible = true;
		}, 2500);
	}
}
