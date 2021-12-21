//----------------------------------------
//               PARTICLE
// ----------------------------------------

let Particle = function (system) {
	this.system = system;
	this.drawType = this.system.drawType;
	this.growthRate = this.system.growthRate;
	this.connectType = 'closest';

	this.routeTable = {
		portOne: false,
		portTwo: false,
		portThree: false,
	};

	this.position =
		this.system.gravityType == 1
			? createVector(mouseX, mouseY)
			: createVector(this.system.position.x + random(-50, 50), this.system.position.y + random(-50, 50));

	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);

	this.distanceFromSystem = 0;
	this.angleFromCursor = 0;

	this.past = [];
	this.lifespan = 255;
	this.mass = 5;
};

Particle.prototype.update = function () {
	this.wasGettingCloser = true;
	this.connectCount = this.system.connectCount;

	this.distanceFromSystem = sqrt(
		(this.position.x - this.system.position.x) * (this.position.x - this.system.position.x) +
			(this.position.y - this.system.position.y) * (this.position.y - this.system.position.y)
	);
	this.angleFromCursor = atan2(this.system.position.y - this.position.y, this.system.position.x - this.position.x);

	if (this.system.gravityType == 1) {
		for (let i = 0; i < this.system.planets.length; i++) {
			this.distanceFromPoint = sqrt(
				(this.position.x - this.system.planets[i].position.x) * (this.position.x - this.system.planets[i].position.x) +
					(this.position.y - this.system.planets[i].position.y) * (this.position.y - this.system.planets[i].position.y)
			);
			this.angleFromPoint = atan2(this.system.planets[i].position.y - this.position.y, this.system.planets[i].position.x - this.position.x);
			this.velocity.x += (cos(this.angleFromPoint) * this.distanceFromPoint * this.distanceFromPoint * this.system.planets[i].mass) / 100000;
			this.velocity.y += (sin(this.angleFromPoint) * this.distanceFromPoint * this.distanceFromPoint * this.system.planets[i].mass) / 100000;

			if (this.system.connectType == 'planets') {
				line(
					this.position.x,
					this.position.y,
					(cos(this.angleFromPoint) / this.distanceFromPoint) * this.system.planets[i].mass,
					(sin(this.angleFromPoint) / this.distanceFromPoint) * this.system.planets[i].mass
				);
				print(this.distanceFromPoint);
			}
		}
		if (this.system.cursorGravity.particles == true) {
			this.velocity.x += (cos(this.angleFromCursor) * this.distanceFromSystem * this.distanceFromSystem) / 100000;
			this.velocity.y += (sin(this.angleFromCursor) * this.distanceFromSystem * this.distanceFromSystem) / 100000;
		}
	}
	if (this.system.gravityType == 2) {
		for (let i = 0; i < this.system.planets.length; i++) {
			this.distanceFromPoint = sqrt(
				(this.position.x - this.system.planets[i].position.x) * (this.position.x - this.system.planets[i].position.x) +
					(this.position.y - this.system.planets[i].position.y) * (this.position.y - this.system.planets[i].position.y)
			);
			this.angleFromPoint = atan2(this.system.planets[i].position.y - this.position.y, this.system.planets[i].position.x - this.position.x);
			this.velocity.x += (cos(this.angleFromPoint) / this.distanceFromPoint) * this.system.planets[i].mass;
			this.velocity.y += (sin(this.angleFromPoint) / this.distanceFromPoint) * this.system.planets[i].mass;
			print(this.angleFromPoint);

			if (this.system.connectType == 'planets') {
				line(
					this.position.x,
					this.position.y,
					(cos(this.angleFromPoint) / this.distanceFromPoint) * this.system.planets[i].mass,
					(sin(this.angleFromPoint) / this.distanceFromPoint) * this.system.planets[i].mass
				);
			}
		}
		if (this.system.gravityType == 2 && this.system.cursorGravity.particles == true) {
			this.velocity.x += cos(this.angleFromCursor) / this.distanceFromSystem;
			this.velocity.y += sin(this.angleFromCursor) / this.distanceFromSystem;
		}
	}

	this.previousPosition = createVector(this.position.x, this.position.y);

	this.position.x += this.velocity.x;
	this.position.y += this.velocity.y;

	this.mass += this.system.growthRate;

	if (this.mass <= 0) {
		this.mass = 0.1;
	}

	this.connected = false;
};

Particle.prototype.display = function () {
	stroke(color(r, g, b));
	fill(color(r, g, b));
	if (this.drawType == 'dot') {
		ellipse(this.position.x, this.position.y, this.mass, this.mass);
	} else if (this.drawType == 'line') {
		strokeWeight(1);
		if (!this.system.sticks) {
			line(this.previousPosition.x, this.previousPosition.y, this.position.x, this.position.y);
		} else {
			line(this.position.x, this.position.y, this.position.x + this.mass, this.position.y);
		}
	}
};

Particle.prototype.getClosest = function () {
	let closest;
	let closest2;
	let closest3;
	let distance = 100000;
	let distance2 = 100000;
	let distance3 = 100000;

	let i;
	for (i = 0; i < this.system.particles.length - 1; i++) {
		particle = this.system.particles[i];
		if (particle != this) {
			partdist = sqrt(
				(this.position.x - particle.position.x) * (this.position.x - particle.position.x) +
					(this.position.y - particle.position.y) * (this.position.y - particle.position.y)
			);
			if (partdist < distance) {
				distance = partdist;
				closest = particle;
			} else if (partdist < distance2) {
				distance2 = partdist;
				closest2 = particle;
			} else if (partdist < distance3) {
				distance3 = partdist;
				closest3 = particle;
			}
		}
	}
	if (closest && closest2 && closest3 && this.system.connectCount > 2) {
		return [closest, closest2, closest3];
	} else if (closest && closest2 && this.connectCount > 1) {
		return [closest, closest2];
	} else if (closest) {
		return [closest];
	} else {
		return null;
	}
};
