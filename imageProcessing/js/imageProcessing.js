const sceneW = 800;
const sceneH = 800;

let picture;
function preload() {
	picture = loadImage('../assets/cat.png');
}

function setup() {
	createCanvas(800, 800);
	// Top-left corner of the picture is at (0, 0)
	// Width and height are the picture's original width and height
	image(picture, 0, 0);
}

function draw() {
	picture.loadPixels();
	for (let x in picture.width) {
		for (let y in picture.height) {
			let index = x + y * picture.width;
			let pixel = picture.pixels[index];

			let r = red(pixel);
			let g = green(pixel);
			let b = blue(pixel);

			r = round(r / 255) * 255;
			g = round(g / 255) * 255;
			b = round(b / 255) * 255;
		}
	}
	picture.updatePixels();
	image(picture, 512, 0);
}
