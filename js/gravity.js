function setup() {
    canvas = createCanvas(windowWidth,windowHeight);
    canvas.position(0,0);
    system = new System(mouseX, mouseY);
    background(0);
    BACKGROUND = 0;
    stroke(255-BACKGROUND);
    play = true;
    
    controls = "\nleft/right to add or pop particles\n\
up/down to increase/decrease gravity\n \
l to draw lines\n \
d to draw dots\n \
t to turn trace off\n \
c to clean the sketchboard\n \
s to save \ "
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
        if (play){
            noLoop();
            alert(controls);
        }
        else{
            loop();
        }
        play=!play;
    }
    if (key == 'b'){
        if (BACKGROUND == 0){
            BACKGROUND = 255;
        }
        else {
            BACKGROUND = 0;
        }
    }
    if (key == "q"){
        window.location.href = "../html/examples.html";
    }
    if (key == 'r'){
        system = new System(mouseX, mouseY);
    }
    }