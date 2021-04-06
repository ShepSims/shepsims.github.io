window.location.hash = "gravity";
function setup() {
    canvas = createCanvas(windowWidth,windowHeight);
    canvas.position(0,0);
    system = new System(mouseX, mouseY);
    BACKGROUND = 255;
    PARTICLE_COLOR = 0;
    play = true;
    
    
    controls = "     \
h - help\n\n     \
left - add particle\n     \
right - pop particle\n     \
up - increase growthRate\n     \
down - increase growthRate\n\n     \
l - add particles mode: line \n     \
d - add particles mode: dots\n     \
z - toggle line mass\n\n     \
t - toggle trace\n     \
x - toggle closest sibling link\n     \
o - toggle connect closest points\n     \
b - invert\n\n     \
c - clean the sketchboard\n\n     \
s - save\n     \
p - play/pause\n     \
q - quit to examples\n\n     \
r - reset";
    text("h for help", 10, 15);
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
    if (key == 'h'){
        text(controls, 10, 25, 1000, 1000)
    }
}