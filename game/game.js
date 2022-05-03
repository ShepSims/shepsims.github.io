const FPS = 30; // frames per second
const FRICTION = 0.7; // friction coefficient of space (0 = none, 1 = lots)
const BULL_SIZE = 30; // in pixels
const TURN_SPEED = 360; // turn speed in degrees per second
const LASER_SPD = 30;
let CURRENT_BITCOIN_VALUE;
let SCORE = 0;
let HIGH_SCORE = 0;
let HIGH_VALUE = 0;
let TIME = 0;
let choice = 'coinPos1';
let menu = false;
let value = 0;
let valueString;
getPrice();

// get canvas properties
var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');
context.canvas.width = window.innerWidth - 50;
context.canvas.height = window.innerHeight - 50;
coinPos = { x: Math.floor(Math.random() * (context.canvas.width - 25)), y: Math.floor(Math.random() * (context.canvas.height - 25)) };

var bull = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	r: BULL_SIZE / 2,
	moveUp: false,
	moveDown: false,
	moveLeft: false,
	moveRight: false,
	shotClock: 0,
	lasers: [],
	hp: 3,
	ammo: 10,
	boost: 100,
};

var bears = [
	{
		x: coinPos.x - 25,
		y: coinPos.y - 25,
		r: BULL_SIZE / 2,
		moveUp: false,
		moveDown: false,
		moveLeft: true,
		moveRight: false,
	},
];

// event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// update loop
setInterval(update, 1000 / FPS);

function getPrice() {
	var xmlhttp = new XMLHttpRequest();
	var url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var json = JSON.parse(this.responseText);
			parseJson(json);
		}
	};
	xmlhttp.open('GET', url, true);
	xmlhttp.send();

	function parseJson(json) {
		var usdVal = json['bpi']['USD']['rate'];

		CURRENT_BITCOIN_VALUE = usdVal;
	}
}

bull.moveLeft = keyIsDown(LEFT_ARROW);

bull.moveRight = keyIsDown(RIGHT_ARROW);

bull.moveUp = keyIsDown(UP_ARROW);

bull.moveDown = keyIsDown(DOWN_ARROW);

if (keyIsDown(65)) {
	a = { x: -1, y: 0 };
	if (bull.shotClock < 1) {
		fire(a);
	}
}
if (keyIsDown(87)) {
	a = { x: -1, y: 0 };
	if (bull.shotClock < 1) {
		fire(a);
	}
}
if (keyIsDown(83)) {
	a = { x: 0, y: -1 };
	if (bull.shotClock < 1) {
		fire(a);
	}
}
if (keyIsDown(68)) {
	a = { x: 1, y: 0 };
	if (bull.shotClock < 1) {
		fire(a);
	}
}

menu = keyIsDown(72);

bull.charge = keyIsDown(32);

if (keyIsDown(8)) {
	window.location.href = 'https://shep.blog';
}

function calculateValue() {
	value = parseInt(CURRENT_BITCOIN_VALUE.split(',').join('')) * SCORE;
	if (value < 1e3) return value;
	if (value >= 1e3 && value < 1e6) return +(value / 1e3).toFixed(1) + 'K';
	if (value >= 1e6 && value < 1e9) return +(value / 1e6).toFixed(1) + 'M';
	if (value >= 1e9 && value < 1e12) return +(value / 1e9).toFixed(1) + 'B';
	if (value >= 1e12) return +(value / 1e12).toFixed(1) + 'T';
}

function update() {
	valueString = calculateValue();
	context.canvas.width = window.innerWidth - 25;
	context.canvas.height = window.innerHeight - 25;
	context.fillStyle = 'white';
	context.fillRect(0, 0, canvas.width, canvas.height);

	if (menu) {
		context.fillStyle = 'white';
		context.fillRect(100, 100, 100, 100);
		context.fillStyle = 'black';
		context.font = '20px san-serif';
		context.fillText('Avoid the bears and collect BTC', 20, 245);
		context.fillText('Move: Arrow Keys', 20, 275);
		context.fillText('Shoot: W-A-S-D', 20, 300);
		context.fillText('Charge: Spacebar', 20, 325);
		context.fillText('Exit: Delete', 20, 375);
		context.fillText('Want to contribute?  Submit a pull request to btfetf.github.io', 20, 400);
	}

	if (bull.shotClock > 0) {
		bull.shotClock -= 1;
	}

	function move(object) {
		if (object.moveLeft) {
			object.x = object.x - 5;
		}
		if (object.moveRight) {
			object.x = object.x + 5;
		}
		if (object.moveUp) {
			object.y = object.y + 5;
		}
		if (object.moveDown) {
			object.y = object.y - 5;
		}
	}

	move(bull);
	if (bull.charge && bull.boost > 0) {
		move(bull);
		move(bull);
		move(bull);
		bull.boost--;
	} else if (TIME % 5 == 0 && bull.boost < 100) {
		bull.boost++;
	}

	// handle edge of screen
	function handleEdge(object) {
		if (object.x < 0 - object.r) {
			object.x = canvas.width + object.r;
		} else if (object.x > canvas.width + object.r) {
			object.x = 0 - object.r;
		}
		if (object.y < 0 - object.r) {
			object.y = canvas.height + object.r;
		} else if (object.y > canvas.height + object.r) {
			object.y = 0 - object.r;
		}
	}

	var bearimg = document.getElementById('bear');

	for (bear in bears) {
		if (TIME % 25 == 0) {
			let i = Math.floor(Math.random() * 4);
			if (i == 1) {
				bears[bear].moveDown = true;
				bears[bear].moveLeft = false;
			} else if (i == 2) {
				bears[bear].moveRight = true;
				bears[bear].moveDown = false;
			} else if (i == 3) {
				bears[bear].moveUp = true;
				bears[bear].moveRight = false;
			} else if (i == 0) {
				bears[bear].moveLeft = true;
				bears[bear].moveUp = false;
			}
		}
		move(bears[bear]);
		handleEdge(bears[bear]);

		//if bull runs into bear
		if (Math.sqrt((bull.x - bears[bear].x) * (bull.x - bears[bear].x) + (bull.y - bears[bear].y) * (bull.y - bears[bear].y)) < 75) {
			bull.hp--;
			if (bull.hp < 1) {
				SCORE = 0;
				bull.x = canvas.width / 2;
				bull.y = canvas.height / 2;
				bull.hp = 3;
				bull.ammo = 10;
				bull.boost = 100;
				bears = [
					{
						x: coinPos.x - 25,
						y: coinPos.y - 25,
						r: BULL_SIZE / 2,
						moveUp: false,
						moveDown: false,
						moveLeft: true,
						moveRight: false,
					},
				];
			} else {
				bears.splice(bear, 1);
			}
		}
		context.drawImage(bearimg, bears[bear].x, bears[bear].y, 100, 100);
	}

	handleEdge(bull);

	// if bull runs into coin
	if (Math.sqrt((bull.x - coinPos.x) * (bull.x - coinPos.x) + (bull.y - coinPos.y) * (bull.y - coinPos.y)) < 75) {
		SCORE++;
		if (SCORE > HIGH_SCORE) {
			HIGH_SCORE = SCORE;
			HIGH_VALUE = value + parseInt(CURRENT_BITCOIN_VALUE.split(',').join(''));
		}
		if (SCORE % 10 == 0) {
			bull.ammo++;
		}
		coinPos.x = Math.floor(Math.random() * (context.canvas.width - 25));
		coinPos.y = Math.floor(Math.random() * (context.canvas.height - 25));
		bears.push({
			x: coinPos.x + 25,
			y: coinPos.y + 25,
			r: BULL_SIZE / 2,
			moveUp: false,
			moveDown: false,
			moveLeft: true,
			moveRight: false,
		});
	}

	function bounceCheck(laser) {
		if (laser.y + laser.yv < 0) {
			laser.yv = -laser.yv;
		} else if (laser.y + laser.yv > canvas.height) {
			laser.dy = -laser.dy;
		}
	}

	var ticker = document.getElementById('greenticker');
	//check if laser hit bears or wall if bouncy
	for (var i = 0; i < bull.lasers.length; i++) {
		bull.lasers[i].life--;
		bull.lasers[i].x += bull.lasers[i].xv;
		bull.lasers[i].y += bull.lasers[i].yv;
		if (bull.lasers[i].life != 0) {
			for (bear in bears) {
				if (
					Math.sqrt(
						(bull.lasers[i].x - bears[bear].x) * (bull.lasers[i].x - bears[bear].x) +
							(bull.lasers[i].y - bears[bear].y) * (bull.lasers[i].y - bears[bear].y)
					) < 75
				) {
					bears.splice(bear, 1);
					bull.lasers.splice(i, 1);
				} else {
					context.drawImage(ticker, bull.lasers[i].x, bull.lasers[i].y, 25, 25);
				}
			}
		} else {
			bull.lasers.splice(i, 1);
		}
	}

	if (TIME % 4 == 0) {
		if (choice == 'coinPos1') choice = 'coinPos2';
		else if (choice == 'coinPos2') choice = 'coinPos3';
		else if (choice == 'coinPos3') choice = 'coinPos4';
		else if (choice == 'coinPos4') choice = 'coinPos5';
		else if (choice == 'coinPos5') choice = 'coinPos6';
		else if (choice == 'coinPos6') choice = 'coinPos7';
		else if (choice == 'coinPos7') choice = 'coinPos8';
		else if (choice == 'coinPos8') choice = 'coinPos9';
		else if (choice == 'coinPos9') choice = 'coinPos1';
	}
	TIME++;
	context.fillStyle = 'black';
	context.font = '30px san-serif';

	context.fillText('Bitcoin: ' + SCORE, 20, context.canvas.height / 5);
	context.fillText('Current Value: $' + valueString, 20, context.canvas.height / 5 + 30);

	context.fillText('Your High Score: ' + HIGH_SCORE, context.canvas.width - 250, 50);
	context.fillText('$' + HIGH_VALUE, context.canvas.width - 250, 80);
	context.fillStyle = 'black';
	context.font = '20px san-serif';
	context.fillText('Press H for Help ', 20, 20);
	context.fillText('HP: ' + bull.hp, 20, 55);
	context.fillText('Ammo: ' + bull.ammo, 20, 80);
	context.fillText('Charge: ' + bull.boost, 20, 105);
	context.fillText('Leaderboard ', context.canvas.width / 2 - 60, context.canvas.height / 20);
	context.fillText('$694.20T\nUser: musk71', context.canvas.width / 2 - 100, context.canvas.height / 20 + 25);
	context.fillText('$2.07M\nUser: shep', context.canvas.width / 2 - 100, context.canvas.height / 20 + 50);

	var img = document.getElementById(choice);
	var bullimg = !bull.charge > 0 || bull.boost == 0 ? document.getElementById('bullpng') : document.getElementById('bullWithLazers');

	context.drawImage(img, coinPos.x, coinPos.y);
	context.drawImage(bullimg, bull.x, bull.y, !bull.charge || bull.boost == 0 ? 100 : 120, !bull.charge || bull.boost == 0 ? 100 : 120);
}

window.location.hash = 'groceries';

function setup() {
	// Create a new canvas to render our grocery shopping expirience

	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);

	// Dark mode is coo
	background(0);
	fill(255);
	stroke(255);

	update();
}

function draw() {
	update();
}
