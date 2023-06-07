//----------------------------------------
//               PARTICLE
// ----------------------------------------

let Particle = function (x, y, system) {
	this.system = system;
	this.connectType = 'closest';

	this.routeTable = {
		portOne: false,
		portTwo: false,
		portThree: false,
	};

	this.basePosition = createVector(x, y);
	this.position = createVector(x, y);

	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);

	this.distanceFromMouse = 0;
	this.angleFromCursor = 0;

	this.past = [];
	this.lifespan = 255;
	this.mass = 5;
};

Particle.prototype.update = function () {
	stroke(color(r, g, b));
	fill(color(r, g, b));

	this.distanceFromMouse = sqrt((this.position.x - mouseX) * (this.position.x - mouseX) + (this.position.y - mouseY) * (this.position.y - mouseY));
	this.angleFromCursor = atan2(mouseY - this.position.y, mouseX - this.position.x);

	if (this.distanceFromMouse < this.system.radius) {
		this.position.x = this.basePosition.x + (cos(this.angleFromCursor) * this.distanceFromMouse * this.distanceFromMouse) / 370;
		this.position.y = this.basePosition.y + (sin(this.angleFromCursor) * this.distanceFromMouse * this.distanceFromMouse) / 370;
	} else {
		this.position.x = this.basePosition.x + (cos(this.angleFromCursor) * this.distanceFromMouse * this.distanceFromMouse) / 10000;
		this.position.y = this.basePosition.y + (sin(this.angleFromCursor) * this.distanceFromMouse * this.distanceFromMouse) / 10000;
	}
	circle(this.position.x, this.position.y, 1);
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
