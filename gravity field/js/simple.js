let audioContext;
let analyser;
let microphone;
let dataArray;
let particles = []; // Array to hold particles
let numParticles = 100; // Total number of particles
let cols, rows; // Number of columns and rows for the grid
let spacing = 50; // Spacing between particles
let centerPoint; // Central point for attraction

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	setupAudio(); // Initialize audio setup

	// Calculate number of columns and rows based on canvas size and spacing
	cols = Math.floor(width / spacing);
	rows = Math.floor(height / spacing);

	// Initialize particles in an even grid layout
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let x = i * spacing + spacing / 2; // Center particles in their grid cell
			let y = j * spacing + spacing / 2; // Center particles in their grid cell
			particles.push(new Particle(x, y)); // Add particle at calculated position
		}
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

	// Log the entire frequency data array
	console.log(dataArray);

	// Calculate the amplitude (volume) from the frequency data
	const amplitude = Math.max(...dataArray); // Get the peak amplitude

	// Update and draw each particle
	background(0);
	for (let particle of particles) {
		particle.update(amplitude, centerPoint, dataArray); // Update particle with amplitude, center point, and frequency data
		particle.display(); // Draw the particle
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight); // Resize canvas on window resize
}

// Particle class definition
class Particle {
	constructor(x, y) {
		this.basePosition = createVector(x, y); // Store the base position
		this.position = this.basePosition.copy(); // Start at the base position
		this.previousPosition = this.position.copy(); // Store the previous position for tails
		this.velocity = createVector(0, 0);
		this.acceleration = createVector(0, 0);
		this.size = 5; // Initial size of the particle
		this.color = color(255); // Initial color of the particle
	}

	update(amplitude, centerPoint, frequencyData) {
		// Calculate the direction towards the center point
		let direction = p5.Vector.sub(centerPoint, this.position);
		let distance = direction.mag(); // Get the distance to the center point

		// Calculate a small force based on the distance and amplitude
		let forceMagnitude = map(amplitude, 0, 255, 0, 0.1); // Adjust force based on amplitude (small value)
		direction.normalize(); // Normalize the direction vector
		direction.mult(forceMagnitude); // Scale the direction by the force magnitude

		// Apply the calculated force
		this.acceleration.add(direction);

		// Update velocity and position
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);

		// Reset acceleration for the next frame
		this.acceleration.mult(0);

		// Update size based on amplitude
		this.size = map(amplitude, 0, 255, 5, 20); // Adjust size based on amplitude

		// Return to base position if not affected
		if (amplitude < 10) {
			// Threshold to determine if the particle should return
			this.position.lerp(this.basePosition, 0.1); // Smoothly return to base position
		}

		// Store the previous position for drawing the tail
		this.previousPosition.set(this.position);

		// Get the frequency values
		const bassStartIndex = 0; // Start index for bass frequencies
		const bassEndIndex = Math.floor(frequencyData.length * 0.2); // Up to 20% of the array for bass
		const midStartIndex = bassEndIndex; // Start index for mid frequencies
		const midEndIndex = Math.floor(frequencyData.length * 0.7); // Up to 70% of the array for mid
		const highStartIndex = midEndIndex; // Start index for high frequencies
		const highEndIndex = frequencyData.length; // End of the array for high frequencies

		// Calculate average values for each frequency range
		const bassValue = frequencyData.slice(bassStartIndex, bassEndIndex).reduce((a, b) => a + b, 0) / (bassEndIndex - bassStartIndex);
		const midValue = frequencyData.slice(midStartIndex, midEndIndex).reduce((a, b) => a + b, 0) / (midEndIndex - midStartIndex);
		const highValue = frequencyData.slice(highStartIndex, highEndIndex).reduce((a, b) => a + b, 0) / (highEndIndex - highStartIndex);

		// Calculate contributions based on distance
		let bassContribution = map(constrain(distance, 0, width / 4), 0, width / 4, 1, 0); // Closer to center = more bass
		let midContribution = map(constrain(distance, width / 4, width / 2), width / 4, width / 2, 0, 1); // Middle distance = mid tones
		let highContribution = map(constrain(distance, width / 2, width), width / 2, width, 0, 1); // Further away = high tones

		// Normalize contributions to ensure they sum to 1
		let totalContribution = bassContribution + midContribution + highContribution;
		if (totalContribution > 0) {
			bassContribution /= totalContribution;
			midContribution /= totalContribution;
			highContribution /= totalContribution;
		}

		// Calculate the final color based on contributions
		let red = map(bassValue * bassContribution, 0, 255, 0, 255);
		let green = map(midValue * midContribution, 0, 255, 0, 255);
		let blue = map(highValue * highContribution, 0, 255, 0, 255);

		// Adjust brightness scaling for each color channel
		red = constrain(red * 1.2, 0, 255); // Slightly increase red brightness
		green = constrain(green * 1.5, 0, 255); // Increase green brightness more
		blue = constrain(blue * 1.5, 0, 255); // Increase blue brightness more

		// Set the particle color
		this.color = color(red, green, blue);
	}

	display() {
		// Draw the tail
		stroke(this.color);
		strokeWeight(2);
		line(this.previousPosition.x, this.previousPosition.y, this.position.x, this.position.y); // Draw tail

		// Draw the particle
		fill(this.color); // Set fill color to the particle's color
		noStroke();
		ellipse(this.position.x, this.position.y, this.size); // Draw the particle
	}
}
