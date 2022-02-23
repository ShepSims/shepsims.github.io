let Bull = function (x, y) {
	this.position = createVector(x, y);
	this.velocity = createVector(0, 0);
	this.mass = 0;
	this.ammo = 10;
	this.shotClock = 15;
	this.laserSpeed = 2;
	this.lasers = [];
	this.charge = false;
};

Bull.prototype.fire = function (a) {
	if (this.ammo > 0) {
		this.ammo--;
		this.shotClock = 15;
		// create the laser object
		this.lasers.push({
			x: this.position.x,
			y: this.position.y,
			xv: this.laserSpeed * a.x,
			yv: -this.laserSpeed * a.y,
			life: 25,
		});
	}
};

Bull.prototype.move = function () {};
