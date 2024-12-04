// level.js

class Level {
	constructor(number) {
		this.number = number;
		this.rooms = [];
		this.generateLevel();
	}

	generateLevel() {
		// For simplicity, create one room
		let room = new Room(0, 0, canvas.width, canvas.height);
		this.rooms.push(room);
	}

	update() {
		// Update all rooms
		this.rooms.forEach((room) => room.update());
	}

	draw(context) {
		// Draw all rooms
		this.rooms.forEach((room) => room.draw(context));
	}
}
