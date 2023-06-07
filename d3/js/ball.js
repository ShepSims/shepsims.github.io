// Ball object - multiple balls can be created by instantiating new objects
function Ball(svg, x, y, id, color, aoa, weight) {
	this.posX = x; // cx
	this.posY = y; // cy
	this.color = color;
	this.radius = weight; // radius and weight same
	this.jumpSize = 1; // equivalent of speed default to 1
	this.svg = svg; // parent SVG
	this.id = id; // id of ball
	this.aoa = aoa; // initial angle of attack
	this.weight = weight;

	if (!this.aoa) this.aoa = Math.PI / 7;
	if (!this.weight) this.weight = 10;
	this.radius = this.weight;

	this.data = [this.id]; // allow us to use d3.enter()

	var thisobj = this; // i like to use thisobj instead of this. this many times not reliable particularly handling evnet

	// **** aoa is used only here -- earlier I was using to next move position.
	// Now aoa and speed together is velocity
	this.vx = Math.cos(thisobj.aoa) * thisobj.jumpSize; // velocity x
	this.vy = Math.sin(thisobj.aoa) * thisobj.jumpSize; // velocity y
	this.initialVx = this.vx;
	this.initialVy = this.vy;
	this.initialPosX = this.posX;
	this.initialPosY = this.posY;

	// when speed changes, go to initial setting
	this.GoToInitialSettings = function (newjumpSize) {
		thisobj.posX = thisobj.initialPosX;
		thisobj.posY = thisobj.initialPosY;
		thisobj.vx = Math.cos(thisobj.aoa) * newjumpSize; // velocity x
		thisobj.vy = Math.sin(thisobj.aoa) * newjumpSize; // velocity y
		thisobj.Draw();
	};

	this.Draw = function () {
		var svg = thisobj.svg;
		var ball = svg.selectAll('#' + thisobj.id).data(thisobj.data);
		ball.enter().append('circle').attr({ id: thisobj.id, class: 'ball', r: thisobj.radius, weight: thisobj.weight }).style('fill', thisobj.color);
		ball
			//.transition()//.duration(50)
			.attr('cx', thisobj.posX)
			.attr('cy', thisobj.posY);
		// intersect ball is used to show collision effect - every ball has it's own intersect ball
		var intersectBall = ball
			.enter()
			.append('circle')
			.attr({ id: thisobj.id + '_intersect', class: 'intersectBall' });
	};

	this.Move = function () {
		var svg = thisobj.svg;

		//thisobj.posX += Math.cos(thisobj.aoa) * thisobj.jumpSize;
		//thisobj.posY += Math.sin(thisobj.aoa) * thisobj.jumpSize;

		thisobj.posX += thisobj.vx;
		thisobj.posY += thisobj.vy;

		if (parseInt(svg.attr('width')) <= thisobj.posX + thisobj.radius) {
			thisobj.posX = parseInt(svg.attr('width')) - thisobj.radius - 1;
			thisobj.aoa = Math.PI - thisobj.aoa;
			thisobj.vx = -thisobj.vx;
		}

		if (thisobj.posX < thisobj.radius) {
			thisobj.posX = thisobj.radius + 1;
			thisobj.aoa = Math.PI - thisobj.aoa;
			thisobj.vx = -thisobj.vx;
		}

		if (parseInt(svg.attr('height')) < thisobj.posY + thisobj.radius) {
			thisobj.posY = parseInt(svg.attr('height')) - thisobj.radius - 1;
			thisobj.aoa = 2 * Math.PI - thisobj.aoa;
			thisobj.vy = -thisobj.vy;
		}

		if (thisobj.posY < thisobj.radius) {
			thisobj.posY = thisobj.radius + 1;
			thisobj.aoa = 2 * Math.PI - thisobj.aoa;
			thisobj.vy = -thisobj.vy;
		}

		// **** NOT USING AOA except during initilization. Just left this for future reference *****
		if (thisobj.aoa > 2 * Math.PI) thisobj.aoa = thisobj.aoa - 2 * Math.PI;
		if (thisobj.aoa < 0) thisobj.aoa = 2 * Math.PI + thisobj.aoa;

		thisobj.Draw();
	};
}
