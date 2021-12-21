window.location.hash = 'gravity';

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	system = new System(mouseX, mouseY);

	r = 255;
	g = 255;
	b = 255;
	resetdelay = 0;
	play = true;
	menu = false;
	start = true;
	c = true;
	cursor(CROSS);

	controls =
		"\n     \
--------------------------\n     \
          GENERAL\n     \
--------------------------\n\n     \
u - toggle cursor planet gravity   \n     \
j - toggle cursor particle gravity   \n     \
right - add particle\n     \
left - pop particle\n     \
up - increase nearest planet size\n     \
down - decrease nearest planet size\n\n     \
a - add another planet\n     \
d - delete closest planet\n\n     \
m - show this menu   \n     \
h - hide cursor and planets \n     \
c - clear screen \n     \
r - reset system\n\n     \
x - twinkle\n\n     \
f - freeze planets\n\n     \
--------------------------\n     \
          COLOR\n     \
--------------------------\n\n     \
y - invert background\n     \
b - black particles\n     \
w - white particles\n\n     \
[ - add red\n     \
] - subtract red\n     \
; - add green\n     \
' - subtract green\n     \
. - add blue\n     \
/ - subtract blue\n\n     \
--------------------------\n     \
          MODE\n     \
--------------------------\n\n     \
l - add particle mode: point \n     \
d - add particle mode: dots\n     \
z - toggle line mass\n\n     \
t - toggle trace\n\n     \
z - draw sticks\n     \
--------------------------\n     \
         LINKING\n     \
--------------------------\n\n     \
x - toggle closest sibling link\n     \
o - toggle connect closest points\n\n     \
--------------------------\n     \
           OTHER\n     \
--------------------------\n\n     \
s - save\n     \
p - play/pause\n     \
q - quit to examples";
	BACKGROUND = 0;
	background(BACKGROUND);
}

function draw() {
	if (resetdelay == 5 && frameCount % 30 == 0) {
		r = 255 - r;
		g = 255 - g;
		b = 255 - b;
	}
	if (start == 1) {
		system.addParticle();
	}
	system.run();
	if (system.connectType != null) {
		system.connect();
	}
	if (start < 5) {
		text(controls, 5, 15, 1000, 1000);
		system.popParticle();
		start++;
	} else if (start < 6) {
		system.addPlanet();
		start++;
	}
}

function mousePressed() {
	mouseButton == LEFT ? (system.growthRate += 0.1) : (system.growthRate -= 0.1);
}

function keyPressed() {
	if (keyCode == LEFT_ARROW) {
		system.popParticle();
	}
	if (keyCode == RIGHT_ARROW) {
		system.addParticle();
	}
	if (keyCode == DOWN_ARROW) {
		let mindist = 100000000000;
		let index = -1;
		for (let i in system.planets) {
			console.log(system.planets[i]);
			distanceFromSystem = sqrt(
				(system.planets[i].position.x - mouseX) * (system.planets[i].position.x - mouseX) +
					(mouseY - system.planets[i].position.y) * (mouseY - system.planets[i].position.y)
			);
			if (distanceFromSystem < mindist) {
				mindist = distanceFromSystem;
				index = i;
			}
		}
		if (index != -1) {
			system.planets[index].mass > 1 ? (system.planets[index].mass -= 1) : (system.planets[index].mass = 0.2);
		}
	}
	if (keyCode == UP_ARROW) {
		let mindist = 100000000000;
		let index = -1;
		for (let i in system.planets) {
			distanceFromSystem = sqrt(
				(system.planets[i].position.x - mouseX) * (system.planets[i].position.x - mouseX) +
					(mouseY - system.planets[i].position.y) * (mouseY - system.planets[i].position.y)
			);
			if (distanceFromSystem < mindist) {
				mindist = distanceFromSystem;
				index = i;
			}
		}
		if (index != -1) {
			system.planets[index].mass += 2;
		}
	}
	if (key == 'l') {
		if (system.drawType == 'line') {
			system.drawType = 'dot';
		} else {
			system.drawType = 'line';
		}
	}
	if (key == 'z') {
		system.sticks = !system.sticks;
	}
	if (key == 'c') {
		background(BACKGROUND);
	}
	if (key == 'f') {
		for (let p in system.planets) {
			system.planets[p].velocity.x = 0;
			system.planets[p].velocity.y = 0;
		}
	}
	if (key == 'u') {
		system.cursorGravity.planets = !system.cursorGravity.planets;
	}
	if (key == 'j') {
		system.cursorGravity.particles = !system.cursorGravity.particles;
	}
	if (key == 's') {
		save('drawing.jpg');
	}
	if (key == 'x') {
		system.twinkle = !system.twinkle;
	}
	if (key == 'g') {
		system.gravityType == 2 ? (system.gravityType = 1) : (system.gravityType = 2); // else move type to next from [ normal, inverse, user-defnied gravity list, middle 4]
	}
	if (key == 'a') {
		system.addPlanet();
	}
	if (key == 'd') {
		system.popPlanet();
	}
	if (key == 't') {
		system.trace = !system.trace;
	}
	if (key == 'p') {
		if (play) {
			noLoop();
		} else {
			loop();
		}
		play = !play;
	}
	if (key == 'h') {
		if (c) {
			noCursor();
			system.hide = true;
		} else {
			cursor(CROSS);
			system.hide = false;
		}
		c = !c;
		console.log(c);
	}

	// Particle Color Controls
	if (key == 'b') {
		r = 0;
		g = 0;
		b = 0;
	}
	if (key == 'w') {
		r = 255;
		g = 255;
		b = 255;
	}
	if (key == '[') {
		if (r >= 10) {
			r -= 10;
		}
	}
	if (key == ']') {
		if (r <= 255) {
			r += 10;
		}
	}
	if (key == ';') {
		if (g >= 10) {
			g -= 10;
		}
	}
	if (key == "'") {
		if (g <= 255) {
			g += 10;
		}
	}
	if (key == '.') {
		if (b >= 10) {
			b -= 10;
		}
	}
	if (key == '/') {
		if (b <= 255) {
			b += 10;
		}
	}

	// connecttion types
	if (key == 'i') {
		if (system.connectType == 'pairs') {
			system.connectType = null;
		} else {
			system.connectType = 'pairs';
		}
	}
	if (key == 'o') {
		if (system.connectType == 'closest') {
			system.connectType = null;
		} else {
			system.connectType = 'closest';
		}
	}
	if (key == '0') {
		if (system.connectType == 'planets') {
			system.connectType = null;
		} else {
			system.connectType = 'planets';
		}
	}

	if (key == 'q') {
		window.location.href = '../html/examples.html';
	}
	if (key == 'r') {
		system = new System(mouseX, mouseY);
	}

	if (key == 'm') {
		menu = !menu;
		if (menu) {
			text(controls, 10, 25, 1000, 1000);
		}
	}
	if (key == '1') {
		system.connectCount = 1;
	}
	if (key == '2') {
		system.connectCount = 2;
	}
	if (key == '3') {
		system.connectCount = 3;
	}
	if (key == '5') {
		if (resetdelay == 0) {
			resetdelay = 5;
		} else {
			resetdelay = 0;
		}
	}
	if (key == 'y') {
		BACKGROUND = 255 - BACKGROUND;
	}
}
