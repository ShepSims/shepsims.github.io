let audioContext;
let analyser;
let microphone;
let dataArray;
let particles = []; // Array to hold particles
let numParticles = 200; // Total number of particles
let centerPoint; // Central point for attraction

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	setupAudio(); // Initialize audio setup

	// Initialize particles in random positions
	for (let i = 0; i < numParticles; i++) {
		let x = random(width);
		let y = random(height);
		particles.push(new FunkyParticle(x, y)); // Add particle at random position
	}

	// Define the central point for attraction
	centerPoint = createVector(width / 2, height / 2);
}

function setupAudio() {
	audioContext = new (window.AudioContext || window.webkitAudioContext)();
	analyser = audioContext.createAnalyser();
	analyser.fftSize = 2048;
	dataArray = new Uint8Array(analyser.frequencyBinCount);

	navigator.mediaDevices
		.getUserMedia({ audio: true })
		.then((stream) => {
			microphone = audioContext.createMediaStreamSource(stream);
			microphone.connect(analyser);
			animate();
		})
		.catch((err) => {
			console.error('Error accessing microphone:', err);
		});
}

function animate() {
	requestAnimationFrame(animate);
	analyser.getByteFrequencyData(dataArray);

	// Update and draw each particle
	background(0);
	for (let particle of particles) {
		particle.update(dataArray); // Update particle with frequency data
		particle.display(); // Draw the particle
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight); // Resize canvas on window resize
}

// FunkyParticle class definition
class FunkyParticle {
	constructor(x, y) {
		this.position = createVector(x, y); // Position of the particle
		this.velocity = createVector(random(-2, 2), random(-2, 2)); // Random initial velocity
		this.size = random(5, 15); // Random size
		this.color = color(random(255), random(255), random(255)); // Random color
		this.angle = random(TWO_PI); // Random angle for rotation
	}

	update(frequencyData) {
		// Calculate the average frequency value
		const averageFrequency = frequencyData.reduce((a, b) => a + b, 0) / frequencyData.length;

		// Warp the particle's position based on the average frequency
		let warpAmount = map(averageFrequency, 0, 255, 0, 5); // Warp amount based on audio input
		this.position.x += this.velocity.x + sin(this.angle) * warpAmount; // Warp effect
		this.position.y += this.velocity.y + cos(this.angle) * warpAmount; // Warp effect

		// Update angle for rotation effect
		this.angle += 0.1;

		// Bounce off edges
		if (this.position.x < 0 || this.position.x > width) {
			this.velocity.x *= -1; // Reverse velocity on x-axis
		}
		if (this.position.y < 0 || this.position.y > height) {
			this.velocity.y *= -1; // Reverse velocity on y-axis
		}

		// Change size based on average frequency
		this.size = map(averageFrequency, 0, 255, 5, 30); // Size changes with audio input
	}

	display() {
		// Draw the particle with a funky effect
		fill(this.color);
		noStroke();
		ellipse(this.position.x, this.position.y, this.size + sin(this.angle) * 5, this.size + cos(this.angle) * 5); // Funky size effect
	}
}
