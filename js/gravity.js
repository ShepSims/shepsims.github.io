window.location.hash = "gravity";
function setup() {
    canvas = createCanvas(windowWidth,windowHeight);
    canvas.position(0,0);
    system = new System(mouseX, mouseY);
    background(0);
    BACKGROUND = 0;
    stroke(255-BACKGROUND);
    play = true;
    
    controls = "     \
left/right - add/pop particle\n     \
up/down - increase/decrease growthRate\n     \
l - draw lines\n     \
d - draw dots\n     \
t - toggle trace\n     \
c - clean the sketchboard\n     \
s - save\n     \
p - play/pause\n     \
b - invert\n     \
z - line dashes\n     \
q - quit to examples\n     \
r - reset"
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
    if (key == 'z'){
        system.sticks = !system.sticks;
    }
    if (key == "q"){
        window.location.href = "../html/examples.html";
    }
    if (key == 'r'){
        system = new System(mouseX, mouseY);
    }
    }