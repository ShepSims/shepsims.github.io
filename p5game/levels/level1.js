// game/levels/level1.js
function setupLevel1() {
	let character = new Character(50, 50);
	let door = { x: 700, y: 300, width: 50, height: 100 };
	let ammoPickup = new Pickup(600, 250, 25, 'ammo');

	return { character, door, ammoPickup };
}
