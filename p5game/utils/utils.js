function getDistance(xA, yA, xB, yB) {
	let xDiff = xA - xB;
	let yDiff = yA - yB;
	return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

function inContact(dx1, dy1, dx2, dy2, px, py) {
	return px > dx1 && px < dx2 && py < dy1 && py > dy2;
}
