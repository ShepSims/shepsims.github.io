window.location.hash = "gravity";

function setup() {
    
    canvas = createCanvas(windowWidth,windowHeight);
    canvas.position(0,0);
    system = new System(mouseX, mouseY);
    
    r = 255;
    g = 255;
    b = 255;
    resetdelay = 0;
    play = true;
    menu = false;
    start = true;
    c = true;
    cursor(CROSS);
    
    
    controls = "\n     \
--------------------------\n     \
          GENERAL\n     \
--------------------------\n\n     \
right - add particle\n     \
left - pop particle\n     \
up - increase growthRate\n     \
down - increase growthRate\n\n     \
m - show this menu   \n     \
h - hide cursor \n     \
c - clean the sketchboard\n     \
r - reset\n\n     \
--------------------------\n     \
          COLOR\n     \
--------------------------\n\n     \
y - invert background\n     \
b - black particles\n     \
w - white particles\n\n     \
[ - add red\n     \
] - subtract red\n     \
; - add green\n     \
' - subtract green\n     \
. - add blue\n     \
/ - subtract blue\n\n     \
--------------------------\n     \
          MODE\n     \
--------------------------\n\n     \
l - add particle mode: line \n     \
d - add particle mode: dots\n     \
z - toggle line mass\n\n     \
t - toggle trace\n\n     \
--------------------------\n     \
         LINKING\n     \
--------------------------\n\n     \
x - toggle closest sibling link\n     \
o - toggle connect closest points\n\n     \
--------------------------\n     \
           OTHER\n     \
--------------------------\n\n     \
s - save\n     \
p - play/pause\n     \
q - quit to examples";
BACKGROUND = 0;
background(BACKGROUND);
}


function draw() {
    if (resetdelay == 5 && frameCount%30==0){
        r = 255-r;
        g = 255-g;
        b = 255-b;
    }
    if (start == 1){system.addParticle()}
    system.run();
    if (system.connectType != null) {system.connect()}
    if (start < 5) { 
        text(controls, 10, 25, 1000, 1000);
        system.popParticle()
        start ++;
    }
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
        if (system.drawType == 'line') {
            system.drawType = 'dot';
        }
        else {system.drawType = 'line';}
        
    }
    if (key == 'z'){
        system.sticks = !system.sticks;
    }
    if (key =='c'){
        background(BACKGROUND);
    }
    if (key == 's'){
        save('drawing.jpg');
    }
    if (key == 'g'){

        if (system.gravityType == 4) {  // if we are at end of types reset
            system.gravityType = 1
        } else {
            system.gravityType += 1 // else move type to next from [ normal, inverse, user-defnied gravity list, middle 4]
        }
    }
    if (key == 'a'){
        system.gravityPoints = append(system.gravityPoints, createVector(mouseX, mouseY))
    }
    if (key == 'd'){
        let mindist = 100000000000
        let index = -1
        for (let i in system.gravityPoints) {
            distanceFromSystem = sqrt((system.gravityPoints[i].x - mouseX)*(system.gravityPoints[i].x - mouseX) + (mouseY - system.gravityPoints[i].y)*(mouseY - system.gravityPoints[i].y));
            if (distanceFromSystem < mindist){ mindist = distanceFromSystem; index = i}
        }
        let index2 = system.gravityPoints.length-1;
        let old = system.gravityPoints[index];
        system.gravityPoints[index] = system.gravityPoints[index2];
        system.gravityPoints[index2] = old;
        system.gravityPoints = shorten(system.gravityPoints);
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
    if (key == 'h'){
        if (c){
            noCursor();
            system.hide = true
        }
        else {
            cursor(CROSS);
            system.hide = false
        }
        c=!c;
        console.log(c)
    }
    
    
    // Particle Color Controls
    if (key == 'b'){   
        r = 0;
        g = 0;
        b = 0;
    }
    if (key == 'w') {
        r = 255;
        g = 255;
        b = 255;
    }
    if (key == '['){
        if (r>=10){
            r-=10;
        }
    }
    if (key == ']'){
        if (r<=255){
            r+=10;
        }
    }
    if (key == ';'){
        if (g>=10){
            g-=10;
        }
    }
    if (key == '\''){
        if (g<=255){
            g+=10;
        }
    }
    if (key == '.'){
        if (b>=10){
            b-=10;
        }
    }
    if (key == '/'){
        if (b<=255){
            b+=10;
        }
    }
    
    // connecttion types
    if (key == 'i'){
        if (system.connectType == "pairs") {
            system.connectType = null;
        } else { system.connectType = "pairs"; }
        
    }
    if (key == 'o'){
        if (system.connectType == "closest") {
            system.connectType = null;
        } else { system.connectType = "closest"; }
    }

    if (key == 'u'){
        if (system.connectType == "random") {
            system.connectType = null;
        } else { system.connectType = "random"; }
    }
    
    if (key == "q"){
        window.location.href = "../html/examples.html";
    }
    if (key == 'r'){
        system = new System(mouseX, mouseY);
    }
    
    if (key == 'm'){
        menu = !menu;
        if (menu){
            text(controls, 10, 25, 1000, 1000);
        }
    }
    if (key == '1'){
        system.connectCount = 1;
    }
    if (key == '2'){
        system.connectCount = 2;
    }
    if (key == '3'){
        system.connectCount = 3;
    }
    if (key == '5'){
        if (resetdelay == 0) {resetdelay = 5;}else{resetdelay=0}
        
    }
    if (key == 'y'){
        BACKGROUND=255-BACKGROUND;
    }
}