window.location.hash = "gravity";
function setup() {
    canvas = createCanvas(windowWidth,windowHeight);
    canvas.position(0,0);
    system = new System(mouseX, mouseY);
    BACKGROUND = 0;
    PARTICLE_COLOR = 255;
    play = true;
    
    
    controls = "     \
left/right - add/pop particle\n     \
up/down - increase/decrease growthRate\n     \
l - draw lines\n     \
d - draw dots\n     \
t - toggle trace\n     \
x - toggle particle linking\n     \
c - clean the sketchboard\n     \
s - save\n     \
p - play/pause\n     \
b - invert\n     \
o - connect closest points\n     \
z - line dashes\n     \
q - quit to examples\n     \
r - reset";
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
        background(BACKGROUND);
    }
    if (key == 's'){
        save('drawing.jpg');
    }
    if (key == 'g'){
        system.gravityType = !system.gravityType;
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
            PARTICLE_COLOR = 0;
        }
        else {
            BACKGROUND = 0;
            PARTICLE_COLOR = 255;
    }
    }
    if (key == 'x'){
        system.connected = !system.connected;
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
    if (key == 'o'){
        system.closest=!system.closest;
    }
}