// game.js

// Constants
const FPS = 30;
const LASER_SPD = 30;
const SHOTGUN_SPD = 15;
const BULL_SIZE = 30;
const BEAR_SPEED = 3;
const MATADOR_SPEED = 2;

// Global Variables
let canvas, context;
let player;
let currentLevel;
let enemyProjectiles = [];
let time = 0;
let score = 0;
let highScore = 0;
let highValue = 0;
let menu = false;

// Initialize Game
function init() {
	canvas = document.getElementById('gameCanvas');
	context = canvas.getContext('2d');
	canvas.width = window.innerWidth - 50;
	canvas.height = window.innerHeight - 50;

	// Initialize Player
	player = new Player(canvas.width / 2, canvas.height / 2);

	// Initialize Level
	currentLevel = new Level(1);

	// Event Listeners
	document.addEventListener('keydown', keyDown);
	document.addEventListener('keyup', keyUp);

	// Start Game Loop
	setInterval(update, 1000 / FPS);
}

window.onload = init;

// Event Handlers
function keyDown(ev) {
	switch (ev.keyCode) {
		case 32: // Spacebar
			player.charge = true;
			break;
		case 37: // Left Arrow
			player.moveLeft = true;
			break;
		case 38: // Up Arrow
			player.moveDown = true;
			break;
		case 39: // Right Arrow
			player.moveRight = true;
			break;
		case 40: // Down Arrow
			player.moveUp = true;
			break;
		case 65: // A
			if (player.shotClock <= 0) {
				player.fire({ x: -1, y: 0 });
			}
			break;
		case 87: // W
			if (player.shotClock <= 0) {
				player.fire({ x: 0, y: 1 });
			}
			break;
		case 83: // S
			if (player.shotClock <= 0) {
				player.fire({ x: 0, y: -1 });
			}
			break;
		case 68: // D
			if (player.shotClock <= 0) {
				player.fire({ x: 1, y: 0 });
			}
			break;
		case 72: // H
			menu = true;
			break;
		case 8: // Backspace
			window.location.href = 'https://shep.blog';
			break;
	}
}

function keyUp(ev) {
	switch (ev.keyCode) {
		case 32: // Spacebar
			player.charge = false;
			break;
		case 37: // Left Arrow
			player.moveLeft = false;
			break;
		case 38: // Up Arrow
			player.moveDown = false;
			break;
		case 39: // Right Arrow
			player.moveRight = false;
			break;
		case 40: // Down Arrow
			player.moveUp = false;
			break;
		case 72: // H
			menu = false;
			break;
	}
}

// Game Update Loop
function update() {
	time++;
	canvas.width = window.innerWidth - 25;
	canvas.height = window.innerHeight - 25;

	// Clear Canvas
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Display Menu
	if (menu) {
		context.fillStyle = 'black';
		context.font = '20px sans-serif';
		context.fillText('Avoid the bears and collect BTC', 20, 245);
		context.fillText('Move: Arrow Keys', 20, 275);
		context.fillText('Shoot: W-A-S-D', 20, 300);
		context.fillText('Charge: Spacebar', 20, 325);
		context.fillText('Exit: Delete', 20, 375);
		context.fillText('Want to contribute? Submit a pull request to btfetf.github.io', 20, 400);
		return;
	}

	// Update Player
	player.update();

	// Update Level
	currentLevel.update();

	// Draw Game Elements
	draw();

	// Check Game Over
	if (player.hp <= 0) {
		// Reset Game
		resetGame();
	}
}

// Collect Coin Function
function collectCoin() {
	score++;
	if (score > highScore) {
		highScore = score;
		// highValue calculation if needed
	}

	// Optionally increase player ammo or other stats
	if (score % 10 === 0) {
		player.ammo++;
	}
}

// Draw Function
function draw() {
	// Draw Player
	player.draw(context);

	// Draw Level
	currentLevel.draw(context);

	// Display Score and Stats
	context.fillStyle = 'black';
	context.font = '30px sans-serif';
	context.fillText('Bitcoin: ' + score, 20, canvas.height / 5);
	context.fillText('Your High Score: ' + highScore, canvas.width - 250, 50);
	context.fillStyle = 'black';
	context.font = '20px sans-serif';
	context.fillText('Press H for Help ', 20, 20);
	context.fillText('HP: ' + player.hp, 20, 55);
	context.fillText('Ammo: ' + player.ammo, 20, 80);
	context.fillText('Charge: ' + player.boost, 20, 105);
}

// Reset Game Function
function resetGame() {
	score = 0;
	player.reset(canvas.width / 2, canvas.height / 2);
	currentLevel = new Level(1);
}