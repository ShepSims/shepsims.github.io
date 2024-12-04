// room.js

class Room {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.mobs = [];
		this.powerUps = [];
		this.walls = [];

		// Populate room with mobs and power-ups
		this.populate();
	}

	populate() {
		// Add mobs
		let bear = new Bear(this.x + 100, this.y + 100);
		this.mobs.push(bear);

		let matador = new Matador(this.x + 200, this.y + 200);
		this.mobs.push(matador);

		// Add power-ups
		let powerUp = new PowerUp(this.x + 300, this.y + 300, 'bouncyLasers');
		this.powerUps.push(powerUp);
	}

	update() {
		// Update mobs
		for (let i = this.mobs.length - 1; i >= 0; i--) {
			let mob = this.mobs[i];
			mob.update();

			// Check collision with player
			let dist = Math.hypot(player.x - mob.x, player.y - mob.y);
			if (dist < player.r + mob.r) {
				player.hp--;
				this.mobs.splice(i, 1);
			}
		}

		// Update power-ups
		for (let i = this.powerUps.length - 1; i >= 0; i--) {
			let powerUp = this.powerUps[i];
			if (powerUp.active) {
				let dist = Math.hypot(player.x - powerUp.x, player.y - powerUp.y);
				if (dist < player.r + 15) {
					powerUp.applyEffect(player);
					this.powerUps.splice(i, 1);
				}
			}
		}

		// Update enemy projectiles
		for (let i = enemyProjectiles.length - 1; i >= 0; i--) {
			let projectile = enemyProjectiles[i];
			projectile.update();

			// Check collision with player
			let dist = Math.hypot(player.x - projectile.x, player.y - projectile.y);
			if (dist < player.r + 12.5) {
				player.hp--;
				enemyProjectiles.splice(i, 1);
			}

			// Remove if life ends
			if (projectile.life <= 0) {
				enemyProjectiles.splice(i, 1);
			}
		}
	}

	draw(context) {
		// Draw walls
		this.walls.forEach((wall) => wall.draw(context));

		// Draw mobs
		this.mobs.forEach((mob) => mob.draw(context));

		// Draw power-ups
		this.powerUps.forEach((powerUp) => powerUp.draw(context));

		// Draw enemy projectiles
		enemyProjectiles.forEach((projectile) => projectile.draw(context));
	}
}
