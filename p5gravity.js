function setup() {
    createCanvas(windowWidth,windowHeight);
    system = new System(mouseX, mouseY);
    background(0);
    detached = [];
    play = true;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    system.run();
}

function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        system.popParticle();
    }
    if (keyCode == RIGHT_ARROW) {
        system.addParticle();
    }
    if (keyCode == DOWN_ARROW) {
        system.growthRate -= 0.1;
    }
    if (keyCode == UP_ARROW) {
        system.growthRate += 0.1;
    }
    if (key == 'l'){
        system.type = 'line';
    }
    if (key =='d'){
        system.type = 'dot';
    }
    if (key =='c'){
        background(0);
    }
    if (key == 's'){
        save('drawing.jpg');
    }
    if (key == 'g'){
        system.gravityType = !system.gravityType
    }
    if (key == 't'){
        system.trace = !system.trace;
    }
    if (key == 'p'){
        if (play){noLoop();}
        else{loop();}
        play=!play;
    }
    if (key == 'b'){
        system = new System(mouseX, mouseY);
    }
}