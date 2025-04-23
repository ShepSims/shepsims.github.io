// player.js

class Player {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.r = BULL_SIZE / 2;
		this.moveUp = false;
		this.moveDown = false;
		this.moveLeft = false;
		this.moveRight = false;
		this.charge = false;
		this.shotClock = 0;
		this.lasers = [];
		this.hp = 3;
		this.ammo = 10;
		this.boost = 100;
		this.bounce = false;
		this.doubleShot = false;
		this.fork = false;
		this.devMode = false;
	}

	reset(x, y) {
		this.x = x;
		this.y = y;
		this.hp = 3;
		this.ammo = 10;
		this.boost = 100;
		this.lasers = [];
		this.bounce = false;
		this.doubleShot = false;
		this.fork = false;
	}

	update() {
		if (this.shotClock > 0) {
			this.shotClock--;
		}

		this.move();

		if (this.charge && this.boost > 0) {
			this.chargeMove();
			this.boost--;
		} else if (time % 5 == 0 && this.boost < 100) {
			this.boost++;
		}

		// Update Lasers
		for (let i = this.lasers.length - 1; i >= 0; i--) {
			let laser = this.lasers[i];
			laser.update();

			// Remove laser if life ends
			if (laser.life <= 0) {
				this.lasers.splice(i, 1);
			}
		}
	}

	move() {
		if (this.devMode) {
			const speed = this.charge ? 15 : 10;
			if (this.moveLeft) this.x -= speed;
			if (this.moveRight) this.x += speed;
			if (this.moveUp) this.y -= speed;
			if (this.moveDown) this.y += speed;
		} else {
			if (this.moveLeft) this.x -= 5;
			if (this.moveRight) this.x += 5;
			if (this.moveUp) this.y += 5;
			if (this.moveDown) this.y -= 5;
		}

		// Handle screen edges
		if (this.x < 0 - this.r) {
			this.x = canvas.width + this.r;
		} else if (this.x > canvas.width + this.r) {
			this.x = 0 - this.r;
		}
		if (this.y < 0 - this.r) {
			this.y = canvas.height + this.r;
		} else if (this.y > canvas.height + this.r) {
			this.y = 0 - this.r;
		}
	}

	chargeMove() {
		this.move();
		this.move();
		this.move();
	}

	fire(direction) {
		if (this.ammo > 0) {
			this.ammo--;
			this.shotClock = 15;
			// Create laser
			this.lasers.push(new Laser(this.x, this.y, LASER_SPD * direction.x, -LASER_SPD * direction.y, this.bounce));
			if (this.doubleShot) {
				this.lasers.push(new Laser(this.x + 10, this.y + 10, LASER_SPD * direction.x, -LASER_SPD * direction.y, this.bounce));
			}
			if (this.fork) {
				this.lasers.push(new Laser(this.x - 10, this.y - 10, LASER_SPD * direction.x, -LASER_SPD * direction.y, this.bounce));
			}
		}
	}

	draw(context) {
		let img = document.getElementById(this.charge && this.boost > 0 ? 'bullWithLazers' : 'bullpng');
		context.drawImage(img, this.x - this.r, this.y - this.r, BULL_SIZE, BULL_SIZE);

		// Draw Lasers
		this.lasers.forEach((laser) => laser.draw(context));
	}

	toggleDevMode() {
		this.devMode = !this.devMode;
		if (this.devMode) {
			this.hp = 999;
			this.ammo = 999;
			this.boost = 999;
			this.bounce = true;
			this.doubleShot = true;
			this.fork = true;
		} else {
			this.reset(this.x, this.y);
		}
	}
}

class Laser {
	constructor(x, y, xv, yv, bounce) {
		this.x = x;
		this.y = y;
		this.xv = xv;
		this.yv = yv;
		this.bounce = bounce;
		this.life = bounce ? 150 : 25;
	}

	update() {
		this.life--;
		this.x += this.xv;
		this.y += this.yv;

		// Bounce logic
		if (this.bounce) {
			if (this.x <= 0 || this.x >= canvas.width) {
				this.xv = -this.xv;
			}
			if (this.y <= 0 || this.y >= canvas.height) {
				this.yv = -this.yv;
			}
		}
	}

	draw(context) {
		let img = document.getElementById('greenticker');
		context.drawImage(img, this.x - 12.5, this.y - 12.5, 25, 25);
	}
}
