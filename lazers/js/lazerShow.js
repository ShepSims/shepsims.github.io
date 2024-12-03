let audioContext;
let analyser;
let microphone;
let dataArray;
let laserPointers = []; // Array to hold laser pointers
let lasers = []; // Array to hold laser pointers
let particles = []; // Array to hold particles
let backgroundColor; // Background color

// Define amplitude thresholds for each laser pointer
const amplitudeThresholds = [
	200, // Threshold for bass (top left)
	150, // Threshold for mid (top right)
	120, // Threshold for high (bottom left)
	80, // Threshold for all frequencies (bottom right)
	100, // Threshold for drums (center)
];

// Smoothing variables
let smoothedAmplitudes = [0, 0, 0, 0, 0]; // Smoothed amplitudes for each laser pointer
const smoothingFactor = 0.1; // Smoothing factor

// Peak detection variables
const peakHistory = [0, 0, 0, 0, 0]; // History of peak amplitudes for each laser pointer
const peakThreshold = 10; // Minimum difference to consider a new peak
const decayRate = 0.05; // Rate at which the peak value decays

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	setupAudio(); // Initialize audio setup

	// Define laser pointer positions (corners of the canvas)
	laserPointers.push(createVector(width / 4, height / 4)); // Top left for bass
	laserPointers.push(createVector((3 * width) / 4, height / 4)); // Top right for mid
	laserPointers.push(createVector(width / 4, (3 * height) / 4)); // Bottom left for high
	laserPointers.push(createVector((3 * width) / 4, (3 * height) / 4)); // Bottom right for all frequencies
	laserPointers.push(createVector(width / 2, height / 2)); // Center for drums
	backgroundColor = color(0); // Initial background color
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

	// Calculate the average frequency and amplitude
	const amplitude = Math.max(...dataArray);

	// Update background color based on amplitude with a red undertone
	const redValue = map(amplitude * 1.2, 0, 255, 0, 30); // Map amplitude to red value
	backgroundColor = color(redValue, 0, 0); // Black background with red undertone
	background(backgroundColor);

	// Clear previous lasers and particles
	lasers = [];
	particles = [];

	// Update and draw lasers for each laser pointer
	for (let i = 0; i < laserPointers.length; i++) {
		// Smooth the amplitude for each laser pointer
		smoothedAmplitudes[i] = lerp(smoothedAmplitudes[i], amplitude, smoothingFactor);
		if (detectPeak(i, smoothedAmplitudes[i])) {
			if (i < 2) {
				// Only the top two pointers are lasers
				shootLasers(laserPointers[i], i, smoothedAmplitudes[i]); // Shoot lasers from each pointer if threshold is met
			} else if (i === 4) {
				// Center pointer for drums
				shootLasers(laserPointers[i], i, smoothedAmplitudes[i]); // Shoot the center laser
			} else {
				// Bottom two pointers will create particles
				createParticles(smoothedAmplitudes[i]); // Spread particles across the screen
			}
		}
	}

	// Update and draw vertical bars for mid frequencies
	const midFrequencyData = dataArray.slice(20, 100); // Get mid frequency data
	drawVerticalBars(midFrequencyData); // Draw vertical bars for mid frequencies

	// Update and draw vertical bars for high frequencies
	const highFrequencyData = dataArray.slice(100, 200); // Get high frequency data
	drawHighFrequencyBars(highFrequencyData); // Draw vertical bars for high frequencies

	// Update and display lasers
	for (let laser of lasers) {
		laser.update(dataArray); // Update laser with frequency data
		laser.display(); // Draw the laser
	}

	// Update and display particles
	for (let particle of particles) {
		particle.update();
		particle.display();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight); // Resize canvas on window resize
}

function detectPeak(index, currentAmplitude) {
	// Check if the current amplitude is a peak compared to the history
	if (currentAmplitude > peakHistory[index] + peakThreshold) {
		peakHistory[index] = currentAmplitude; // Update the peak history
		return true; // A peak is detected
	}

	// Decay the peak value over time
	peakHistory[index] -= decayRate;
	if (peakHistory[index] < 0) {
		peakHistory[index] = 0; // Prevent negative values
	}

	// Allow activation if the current amplitude is above a certain minimum level
	if (currentAmplitude > amplitudeThresholds[index]) {
		return true; // Activate even if not a new peak
	}

	return false; // No peak detected
}

function shootLasers(pointer, index, amplitude) {
	// Check if the amplitude exceeds the threshold for the current laser pointer
	if (amplitude < amplitudeThresholds[index]) {
		return; // Do not shoot lasers if the threshold is not met
	}

	const angleStep = TWO_PI / 10; // Calculate angle step based on number of lasers
	let laserCount = map(amplitude, amplitudeThresholds[index], 255, 1, 20); // Map amplitude to number of lasers

	// Determine frequency range for each pointer
	let frequencyRange;
	let laserColor;

	if (index === 0) {
		frequencyRange = dataArray.slice(0, 20); // Low frequencies for top left (bass)
		laserColor = color(255, 0, 0); // Red for bass
	} else if (index === 1) {
		// For mid frequencies, create vertical bars
		laserColor = color(255, 100, 100); // Lighter red for mid
		const midFrequencyData = dataArray.slice(20, 100); // Mid frequencies
		drawVerticalBars(midFrequencyData); // Draw vertical bars for mid frequencies
		return; // Exit to avoid drawing a single laser
	} else if (index === 4) {
		frequencyRange = dataArray.slice(0, 100); // Focus on lower frequencies for drums (kick and snare)
		laserColor = color(255, 165, 0); // Orange for drums
	}

	// Calculate average frequency for color
	const avgFrequency = frequencyRange.reduce((a, b) => a + b, 0) / frequencyRange.length;

	for (let i = 0; i < laserCount; i++) {
		let angle;
		if (index === 0) {
			angle = PI / 2; // Point down for top left
		} else if (index === 1) {
			// Skip angle calculation for vertical bars
		} else if (index === 4) {
			angle = map(i, 0, laserCount, 0, TWO_PI); // Full circle for center laser
		}

		const laserLength = map(amplitude, 0, 255, 0, height); // Map amplitude to laser length (0 to full screen height)
		lasers.push(new Laser(pointer.x, pointer.y, angle, laserColor, laserLength)); // Create a new laser with the calculated color and length
	}
}

function createParticles(amplitude) {
	const particleCount = map(amplitude, 0, 255, 0, 200); // Map amplitude to number of particles
	for (let i = 0; i < particleCount; i++) {
		// Spread particles across the screen
		const x = random(width); // Random x position across the width
		const y = random(height); // Random y position across the height
		particles.push(new Particle(x, y)); // Create new particles at random positions
	}
}

// Laser class definition
class Laser {
	constructor(x, y, angle, color, length) {
		this.position = createVector(x, y); // Position of the laser
		this.angle = angle; // Angle for laser direction
		this.length = length; // Length of the laser
		this.color = color; // Color for the laser
		this.baseLength = this.length; // Store base length for scaling
	}

	update(frequencyData) {
		// Calculate the average frequency for laser effect
		const lowFreq = frequencyData.slice(0, 20); // Low frequencies
		const midFreq = frequencyData.slice(20, 100); // Mid frequencies
		const highFreq = frequencyData.slice(100, 200); // High frequencies

		// Calculate average values for each frequency band
		const lowAvg = lowFreq.reduce((a, b) => a + b, 0) / lowFreq.length;
		const midAvg = midFreq.reduce((a, b) => a + b, 0) / midFreq.length;
		const highAvg = highFreq.reduce((a, b) => a + b, 0) / highFreq.length;

		// Scale the laser length based on frequency averages
		this.length = this.baseLength + lowAvg / 10 + midAvg / 5 + highAvg / 3; // Adjust length based on frequencies
	}

	display() {
		// Draw the laser beam
		strokeWeight(2);
		stroke(this.color);
		let endX = this.position.x + cos(this.angle) * this.length;
		let endY = this.position.y + sin(this.angle) * this.length;
		line(this.position.x, this.position.y, endX, endY); // Draw laser line

		// Create a glowing effect
		for (let i = 0; i < 5; i++) {
			strokeWeight(2 - i * 0.4);
			stroke(this.color.levels[0], this.color.levels[1], this.color.levels[2], 255 - i * 50); // Fade effect
			line(this.position.x, this.position.y, endX, endY);
		}
	}
}

// Particle class definition
class Particle {
	constructor(x, y) {
		this.position = createVector(x, y);
		this.velocity = p5.Vector.random2D().mult(random(1, 3)); // Random direction and speed
		this.lifespan = 255; // Particle lifespan
		this.size = random(5, 10); // Random size
	}

	update() {
		this.position.add(this.velocity); // Move the particle
		this.lifespan -= 5; // Decrease lifespan
	}

	display() {
		stroke(255, this.lifespan); // White color with fading effect
		strokeWeight(this.size);
		point(this.position.x, this.position.y); // Draw the particle
	}
}

// Function to draw vertical bars for mid frequencies
function drawVerticalBars(midFrequencyData) {
	const barWidth = width / midFrequencyData.length; // Width of each bar
	noStroke(); // Disable stroke to remove borders
	for (let i = 0; i < midFrequencyData.length; i++) {
		const barHeight = map(midFrequencyData[i], 0, 255, 0, height); // Map amplitude to bar height
		const x = i * barWidth; // X position of the bar
		const y = height - barHeight; // Y position (bottom of the canvas)

		// Set color for the bars: dark red fading to bright orange at the top
		const colorValue = map(barHeight, 0, height, 0, 255); // Map height to color value
		const barColor = color(139, 0, 0, 255); // Dark red base color
		fill(barColor.levels[0], barColor.levels[1], barColor.levels[2], 255 - colorValue); // Fade effect

		rect(x, y, barWidth - 2, barHeight); // Draw the bar
	}
}

// Function to draw vertical bars for high frequencies
function drawHighFrequencyBars(highFrequencyData) {
	const barWidth = width / highFrequencyData.length; // Width of each bar
	noStroke(); // Disable stroke to remove borders
	for (let i = 0; i < highFrequencyData.length; i++) {
		const barHeight = map(highFrequencyData[i], 0, 255, 0, height / 2); // Map amplitude to bar height (max half height)
		const x = i * barWidth; // X position of the bar
		const y = 0; // Y position (pinned to the top of the canvas)

		// Set color for the bars: light blue fading to bright cyan at the bottom
		const colorValue = map(barHeight, 0, height / 2, 0, 255); // Map height to color value
		const barColor = color(0, 191, 255, 255); // Light blue base color
		fill(barColor.levels[0], barColor.levels[1], barColor.levels[2], 255 - colorValue); // Fade effect

		rect(x, y, barWidth - 2, barHeight); // Draw the bar from the top
	}
}
