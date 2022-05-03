class Ray {
	constructor(pos, angle) {
		this.pos = pos;
		this.dir = p5.Vector.fromAngle(angle);
	}

	getDir(x, y) {
		this.dir.x = x - this.pos.x;
		this.dir.y = y - this.pos.y;
		this.dir.normalize();
	}

	setAngle(angle) {
		this.dir = p5.Vector.fromAngle(angle);
	}

	show() {
		stroke(255, 100);
		push();
		translate(this.pos.x, this.pos.y);
		line(0, 0, this.dir.x * 10, this.dir.y * 10);
		pop();
	}

	cast(object) {
		if (!object.pos) {
			const x1 = object.a.x;
			const y1 = object.a.y;
			const x2 = object.b.x;
			const y2 = object.b.y;
		} else {
			const x1 = object.pos.x;
			const y1 = object.pos.y;
			const x2 = object.pos.x;
			const y2 = object.pos.y;
		}

		const x3 = this.pos.x;
		const y3 = this.pos.y;
		const x4 = this.pos.x + this.dir.x;
		const y4 = this.pos.y + this.dir.y;

		// return null if lines are parallel
		const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
		if (denom == 0) {
			return;
		}

		// otherwise calculate intersection point

		const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
		const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;

		// if true, find point of intersection by
		// (Px, Py) = (x1 + t*(x2 - x1), y1 + t*(y2-y1))
		// or
		//  (Px, Py) = (x3 + u*(x4-x3), y3+u(y4-y3))

		if (t > 0 && t < 1 && u > 0) {
			const pointOfIntersection = createVector();
			console.log(pointOfIntersection);
			pointOfIntersection.x = x1 + t * (x2 - x1);
			pointOfIntersection.y = y1 + t * (y2 - y1);
			return pointOfIntersection;
		} else {
			return false;
		}
	}
}
