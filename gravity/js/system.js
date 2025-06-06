//----------------------------------------
//               SYSTEM
// ----------------------------------------

let System = function (x, y) {
	this.drawType = 'line'; // ['line', 'dot']
	this.gravityType = 1; // ['normal', 'invert', 'userPoints', 'middle 4']
	this.trace = true;
	this.detached = false;
	this.sticks = false;
	this.pairs = false;
	this.hide = false;
	this.cursorGravity = { particles: true, planets: true };
	this.twinkle = false; // make all planets in system grow and shrink randomly

	this.connectType = null;
	this.connectCount = 1;

	this.position = createVector(x, y);
	this.velocity = createVector(0, 0);
	this.mass = 0;
	this.growthRate = 0.01;

	this.particles = [];

	this.planets = [];
};

System.prototype.run = function () {
	// If not tracing, reset background and redisplay menu
	if (!this.trace) {
		background(BACKGROUND);
		if (menu) {
			text(controls, 10, 25, 1000, 1000);
		}
	}
	if (this.hide == false) {
		for (let i in system.planets) {
			ellipse(system.planets[i].position.x, system.planets[i].position.y, system.planets[i].mass);
		}
	}

	if (this.twinkle) {
		for (let i in this.planets) {
			this.planets[i].mass += random(-0.2, 0.2);
		}
	}
	// Set system position
	this.position.x = mouseX;
	this.position.y = mouseY;

	for (let i = this.planets.length - 1; i >= 0; i--) {
		let planet = this.planets[i];
		planet.update();
		planet.display();

		// increment system mass
		this.mass += system.mass;
	}

	// Update Particles positions and display
	for (let i = this.particles.length - 1; i >= 0; i--) {
		let particle = this.particles[i];
		particle.update();
		particle.display();
		particle.routeTable = {
			portOne: false,
			portTwo: false,
			portThree: false,
		};

		// increment system mass
		this.mass += particle.mass;
	}
	//
	this.mass /= this.particles.length / 5;
};

System.prototype.connect = function () {
	for (let i = this.particles.length - 1; i >= 0; i--) {
		// Select particle
		let p = this.particles[i];

		if (this.connectType == 'closest') {
			// if closest connections enabled, get particles nearest neighbor and draw line between them
			let connections = p.getClosest();
			if (connections) {
				let j = 0;
				for (let point in connections) {
					line(p.position.x, p.position.y, connections[point].position.x, connections[point].position.y);
				}
			}
			// connects particles next to each other in order of creation
		} else if (this.connectType == 'pairs') {
			this.pair();
		}
	}
};

System.prototype.pair = function () {
	var i;

	//Loop through particles
	for (i = 0; i < this.particles.length - 1; i++) {
		p = this.particles[i];

		// If the particle has open ports try to fill them up to capacity
		if (p.routeTable.portOne == false) {
			// Check if next particle has any open ports and connect if so
			p2 = this.particles[i + 1];

			for (let port in p2.routeTable) {
				if (p2.routeTable[port] == false) {
					line(p.position.x, p.position.y, p2.position.x, p2.position.y);
					p.routeTable.portOne = true;
					port = true;
				}
			}
		} else if (p.routeTable.portTwo == false && this.connectCount > 1 && i < this.particles.length - 2) {
			// Check if super next particle has any open ports and connect if so
			p2 = this.particles[i + 2];
			for (let port in p2.routeTable) {
				if (p2.routeTable[port] == false) {
					line(p.position.x, p.position.y, p2.position.x, p2.position.y);
					p.routeTable.portTwo = true;
					port = true;
				}
			}
		} else if (p.routeTable.portThree == false && this.connectCount > 2 && i < this.particles.length - 3) {
			// Check if super super next particle has any open ports and connect if so
			p2 = this.particles[i + 3];
			for (let port in p2.routeTable) {
				if (p2.routeTable[port] == false) {
					line(p.position.x, p.position.y, p2.position.x, p2.position.y);
					p.routeTable.portThree = true;
					port = true;
				}
			}
		}
		i += 1;
	}
};

System.prototype.addParticle = function () {
	this.particles.push(new Particle(this));
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
