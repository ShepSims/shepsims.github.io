function CheckCollision(ball1, ball2) {
	var absx = Math.abs(parseFloat(ball2.posX) - parseFloat(ball1.posX));
	var absy = Math.abs(parseFloat(ball2.posY) - parseFloat(ball1.posY));

	// find distance between two balls.
	var distance = absx * absx + absy * absy;
	distance = Math.sqrt(distance);
	// check if distance is less than sum of two radius - if yes, collision
	if (distance < parseFloat(ball1.radius) + parseFloat(ball2.radius)) {
		return true;
	}
	return false;
}

var balls = []; // global array representing balls
var color = d3.scale.category20();

//courtsey thanks to several internet sites for formulas
//detect collision, find intersecting point and set new speed+direction for each ball based on weight (weight=radius)
function ProcessCollision(ball1, ball2) {
	if (ball2 <= ball1) return;
	if (ball1 >= balls.length - 1 || ball2 >= balls.length) return;

	ball1 = balls[ball1];
	ball2 = balls[ball2];

	if (CheckCollision(ball1, ball2)) {
		// intersection point
		var interx = (ball1.posX * ball2.radius + ball2.posX * ball1.radius) / (ball1.radius + ball2.radius);
		var intery = (ball1.posY * ball2.radius + ball2.posY * ball1.radius) / (ball1.radius + ball2.radius);

		// show collision effect for 500 miliseconds
		var intersectBall = svg.select('#' + ball1.id + '_intersect');
		intersectBall.attr({ cx: interx, cy: intery, r: 5, fill: 'black' }).transition().duration(500).attr('r', 0);

		// calculate new velocity of each ball.
		var vx1 = (ball1.vx * (ball1.weight - ball2.weight) + 2 * ball2.weight * ball2.vx) / (ball1.weight + ball2.weight);
		var vy1 = (ball1.vy * (ball1.weight - ball2.weight) + 2 * ball2.weight * ball2.vy) / (ball1.weight + ball2.weight);
		var vx2 = (ball2.vx * (ball2.weight - ball1.weight) + 2 * ball1.weight * ball1.vx) / (ball1.weight + ball2.weight);
		var vy2 = (ball2.vy * (ball2.weight - ball1.weight) + 2 * ball1.weight * ball1.vy) / (ball1.weight + ball2.weight);

		//set velocities for both balls
		ball1.vx = vx1;
		ball1.vy = vy1;
		ball2.vx = vx2;
		ball2.vy = vy2;

		//ensure one ball is not inside others. distant apart till not colliding
		while (CheckCollision(ball1, ball2)) {
			ball1.posX += ball1.vx;
			ball1.posY += ball1.vy;

			ball2.posX += ball2.vx;
			ball2.posY += ball2.vy;
		}
		ball1.Draw();
		ball2.Draw();
	}
}

function Initialize(containerId) {
	var height = document.getElementById(containerId).clientHeight;
	var width = document.getElementById(containerId).clientWidth;
	gContainerId = containerId;
	gCanvasId = containerId + '_canvas';
	gTopGroupId = containerId + '_topGroup';
	var svg = d3
		.select('#' + containerId)
		.append('svg')
		.attr('id', gCanvasId)
		.attr('width', width)
		.attr('height', height)
		.append('g')
		.attr('id', gTopGroupId)
		.attr('x', 0)
		.attr('y', 0)
		.attr('width', width)
		.attr('height', height)
		.style('fill', 'none');
	//.attr("transform", "translate(" + 1 + "," + 1 + ")")
	balls.push(new Ball(svg, 501, 101, 'n1', 'red', Math.PI / 6));
	balls.push(new Ball(svg, 51, 31, 'n2', 'green', Math.PI / 3, 20));
	balls.push(new Ball(svg, 201, 201, 'n3', 'yellow', Math.PI / 9, 90));
	balls.push(new Ball(svg, 91, 31, 'n4', 'orange', Math.PI / 2, 15));
	balls.push(new Ball(svg, 201, 21, 'n5', 'pink', Math.PI + Math.PI / 4, 15));
	balls.push(new Ball(svg, 401, 41, 'n6', 'blue', Math.PI + Math.PI / 7, 25));

	for (var i = 0; i < balls.length; ++i) {
		balls[i].Draw();
	}
	return svg;
}

var startStopFlag = null;
function StartStopGame() {
	if (startStopFlag == null) {
		d3.timer(function () {
			for (var i = 0; i < balls.length; ++i) {
				var r = balls[i].Move();
				for (var j = i + 1; j < balls.length; ++j) {
					ProcessCollision(i, j);
				}
			}
			if (startStopFlag == null) return true;
			else return false;
		}, 500);
		startStopFlag = 1;
		document.getElementById('startStop').innerHTML = 'Stop';
	} else {
		startStopFlag = null;
		document.getElementById('startStop').innerHTML = 'Start';
	}
}
// I always like to handle ESC key
d3.select('body').on('keydown', function () {
	if (balls.length == 0) return;
	console.log(d3.event);
	if (d3.event.keyCode == 27) {
		// if ESC key - toggle start stop
		StartStopGame();
	}
});

function OnSpeedChange() {
	var o = document.getElementById('speed');
	if (startStopFlag != null) startStopFlag = null; // by setting startStopFlag to null, callback of d3.timer will return true and animation will stop

	setTimeout(function () {
		// go to initial position set new speed (ideally should not go to initial position)
		for (var i = 0; i < balls.length; ++i) {
			var o = document.getElementById('speed');
			newjumpSize = o.options[o.selectedIndex].value;
			balls[i].GoToInitialSettings(parseInt(newjumpSize));
		}
		setTimeout(function () {
			StartStopGame();
		}, 1000);
	}, 500);
}
function OnNumberOfBallsChanged() {
	var o = document.getElementById('numberOfBalls');
	numberOfBalls = o.options[o.selectedIndex].value;
	balls = balls.slice(0, 6);

	d3.selectAll('.ball').remove();
	//keep pushing as many balls you want..
	for (var i = 6; i < numberOfBalls; ++i) {
		balls.push(new Ball(svg, 101, 101, 'n' + (i + 1).toString(), color(i), Math.PI / (i + 1), i % 2 == 0 ? 10 : 10 + i));
	}
}
