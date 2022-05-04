//----------------------------------------
//               SYSTEM
// ----------------------------------------

let System = function () {
	this.particles = [];
	this.planets = [];
	this.i = 0;
	this.radius = 500;
	this.position = createVector(mouseX, mouseY, this);
};

System.prototype.run = function () {
	for (let i = this.particles.length - 1; i >= 0; i--) {
		let particle = this.particles[i];
		particle.update();
	}
};

System.prototype.addParticle = function (x, y) {
	this.particles.push(new Particle(x, y, this));
};

System.prototype.popParticle = function () {
	if (this.particles.length > 0) {
		this.particles.shift();
	}
};

System.prototype.addPlanet = function () {
	this.planets.push(new Planet(this));
};

System.prototype.popPlanet = function () {
	let mindist = 100000000000;
	let index = -1;
	for (let i in this.planets) {
		let p = this.planets[i];
		let dist = sqrt((p.position.x - mouseX) * (p.position.x - mouseX) + (p.position.y - mouseY) * (p.position.y - mouseY));
		if (dist < mindist) {
			mindist = dist;
			index = i;
		}
	}
	let index2 = this.planets.length - 1;
	let old = this.planets[index];
	this.planets[index] = this.planets[index2];
	this.planets[index2] = old;
	this.planets = shorten(this.planets);
};
