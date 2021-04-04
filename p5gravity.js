function setup() {
    createCanvas(1000,500);
    system = new System(mouseX, mouseY);
    background(51);
    detached = [];
}


function draw() {
    system.run(mouseX, mouseY);
}

function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        system.popParticle();
    }
    if (keyCode == RIGHT_ARROW) {
        system.addParticle();
    }
    if (keyCode == DOWN_ARROW) {
        system.gravity += 0.001;
    }
    if (keyCode == UP_ARROW) {
        system.gravtiy -= 0.001;
    }
    if (key == 'l'){
        system.trace = true;
    }
    if (key =='d'){
        system.trace = false;
    }
    if (key =='c'){
        background(0);
    }
    if (key == 's'){
        save('drawing.jpg');
    }
}