// enemy.js

class Enemy {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.r = BULL_SIZE / 2;
		this.ammo = 0;
		this.shotClock = 0;
		this.lasers = [];
	}

	update() {
		// To be implemented in subclasses
	}

	draw(context) {
		// To be implemented in subclasses
	}
}

class Bear extends Enemy {
	constructor(x, y) {
		super(x, y);
		this.type = 'bear';
		this.speed = BEAR_SPEED;
		this.direction = this.randomDirection();
	}

	randomDirection() {
		const directions = ['moveLeft', 'moveRight', 'moveUp', 'moveDown'];
		return directions[Math.floor(Math.random() * directions.length)];
	}

	update() {
		// Change direction randomly
		if (time % 25 === 0) {
			this.direction = this.randomDirection();
		}

		// Move
		switch (this.direction) {
			case 'moveLeft':
				this.x -= this.speed;
				break;
			case 'moveRight':
				this.x += this.speed;
				break;
			case 'moveUp':
				this.y += this.speed;
				break;
			case 'moveDown':
				this.y -= this.speed;
				break;
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

		// Fire at player
		this.fireAtPlayer();
	}

	fireAtPlayer() {
		if (this.ammo > 0 && this.shotClock === 0) {
			this.ammo--;
			this.shotClock = 50;
			let angle = Math.atan2(player.y - this.y, player.x - this.x);
			enemyProjectiles.push(new EnemyProjectile(this.x, this.y, Math.cos(angle) * LASER_SPD, Math.sin(angle) * LASER_SPD));
		} else if (this.shotClock > 0) {
			this.shotClock--;
		}
	}

	draw(context) {
		let img = document.getElementById('bear');
		context.drawImage(img, this.x - this.r, this.y - this.r, BULL_SIZE, BULL_SIZE);
	}
}

class Matador extends Enemy {
	constructor(x, y) {
		super(x, y);
		this.type = 'matador';
		this.speed = MATADOR_SPEED;
		this.shotgunCooldown = 0;
	}

	update() {
		// Move towards player
		let angle = Math.atan2(player.y - this.y, player.x - this.x);
		this.x += Math.cos(angle) * this.speed;
		this.y += Math.sin(angle) * this.speed;

		// Fire shotgun
		this.fireShotgun();
	}

	fireShotgun() {
		if (this.shotgunCooldown <= 0) {
			this.shotgunCooldown = 100;
			for (let i = -30; i <= 30; i += 15) {
				let angle = Math.atan2(player.y - this.y, player.x - this.x) + (i * Math.PI) / 180;
				enemyProjectiles.push(new EnemyProjectile(this.x, this.y, Math.cos(angle) * SHOTGUN_SPD, Math.sin(angle) * SHOTGUN_SPD));
			}
		} else {
			this.shotgunCooldown--;
		}
	}

	draw(context) {
		let img = document.getElementById('matador');
		context.drawImage(img, this.x - this.r, this.y - this.r, BULL_SIZE, BULL_SIZE);
	}
}

class EnemyProjectile {
	constructor(x, y, xv, yv) {
		this.x = x;
		this.y = y;
		this.xv = xv;
		this.yv = yv;
		this.life = 50;
	}

	update() {
		this.life--;
		this.x += this.xv;
		this.y += this.yv;
	}

	draw(context) {
		let img = document.getElementById('projectile');
		context.drawImage(img, this.x - 12.5, this.y - 12.5, 25, 25);
	}
}
