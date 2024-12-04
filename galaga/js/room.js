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
		this.coins = []; // Added coins array

		// Populate room with mobs, power-ups, and coins
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

		// Add coins
		this.spawnCoin();
	}

	spawnCoin() {
		// Create a new coin at a random position within the room
		let coinX = randomRange(this.x + 50, this.x + this.width - 50);
		let coinY = randomRange(this.y + 50, this.y + this.height - 50);

		// Pass the onCollect function to the coin
		let coin = new Coin(coinX, coinY, () => {
			this.handleCoinCollect();
		});

		this.coins.push(coin);
	}

	handleCoinCollect() {
		// Increase score
		collectCoin(); // Assuming collectCoin() is defined globally in game.js

		// Remove the collected coin
		this.coins.pop(); // Assuming only one coin at a time

		// Spawn a new coin
		this.spawnCoin();

		// Spawn a new enemy (bear or matador)
		let newEnemy;
		if (Math.random() < 0.5) {
			newEnemy = new Bear(randomRange(this.x + 50, this.x + this.width - 50), randomRange(this.y + 50, this.y + this.height - 50));
		} else {
			newEnemy = new Matador(randomRange(this.x + 50, this.x + this.width - 50), randomRange(this.y + 50, this.y + this.height - 50));
		}
		this.mobs.push(newEnemy);
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

			// Check collision with player's lasers
			for (let j = player.lasers.length - 1; j >= 0; j--) {
				let laser = player.lasers[j];
				let distToLaser = Math.hypot(laser.x - mob.x, laser.y - mob.y);
				if (distToLaser < mob.r + 12.5) {
					// Remove mob and laser
					this.mobs.splice(i, 1);
					player.lasers.splice(j, 1);
					break;
				}
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

		// Update coins
		for (let i = this.coins.length - 1; i >= 0; i--) {
			let coin = this.coins[i];
			coin.update();

			// Check collision with player
			let dist = Math.hypot(player.x - coin.x, player.y - coin.y);
			if (dist < player.r + coin.r) {
				// Collect coin
				coin.collect(); // Call the collect method
				// Since coin collects handle removing and spawning, no need to splice here
				break;
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

		// Draw coins
		this.coins.forEach((coin) => coin.draw(context));

		// Draw power-ups
		this.powerUps.forEach((powerUp) => powerUp.draw(context));

		// Draw mobs
		this.mobs.forEach((mob) => mob.draw(context));

		// Draw enemy projectiles
		enemyProjectiles.forEach((projectile) => projectile.draw(context));
	}
}
