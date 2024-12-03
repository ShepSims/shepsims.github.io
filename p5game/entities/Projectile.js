class Projectile {
	constructor(x, y, xv, yv, life, damage) {
		this.position = { x, y };
		this.velocity = { x: xv, y: yv };
		this.life = life;
		this.damage = damage;
	}

	update() {
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		this.life--;
	}

	isAlive() {
		return this.life > 0;
	}

	draw() {
		fill(255, 0, 0);
		ellipse(this.position.x, this.position.y, 10, 10);
	}
}

class Bullet extends Projectile {
	constructor(x, y) {
		super(x, y, 0, -5, 25, 10);
	}

	draw() {
		fill(0, 255, 0);
		ellipse(this.position.x, this.position.y, 5, 5);
	}
}

class Rocket extends Projectile {
	constructor(x, y) {
		super(x, y, 0, -3, 50, 20);
	}

	update() {
		super.update();
	}

	draw() {
		fill(255, 165, 0);
		rect(this.position.x, this.position.y, 10, 20);
	}
}

class ForceField extends Projectile {
	constructor(x, y) {
		super(x, y, 0, 0, 100, 0);
		this.radius = 50;
	}

	update() {}

	draw() {
		fill(0, 0, 255, 100);
		ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
	}
}
