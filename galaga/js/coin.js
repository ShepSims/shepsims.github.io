// coin.js

class Coin {
	constructor(x, y, onCollectCallback) {
		this.x = x;
		this.y = y;
		this.r = 25; // Radius for collision detection
		this.frameIndex = 0;
		this.animationFrames = ['coinPos1', 'coinPos2', 'coinPos3', 'coinPos4', 'coinPos5', 'coinPos6', 'coinPos7', 'coinPos8', 'coinPos9'];
		this.onCollect = onCollectCallback; // Store the callback function
	}

	update() {
		// Update animation frame
		if (time % 4 === 0) {
			this.frameIndex = (this.frameIndex + 1) % this.animationFrames.length;
		}
	}

	draw(context) {
		let imgId = this.animationFrames[this.frameIndex];
		let img = document.getElementById(imgId);
		context.drawImage(img, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
	}

	collect() {
		// Call the onCollect callback function when collected
		if (this.onCollect) {
			this.onCollect();
		}
	}
}
