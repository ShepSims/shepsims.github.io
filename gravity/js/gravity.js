window.location.hash = "gravity";
function setup() {
    canvas = createCanvas(windowWidth,windowHeight);
    canvas.position(0,0);
    system = new System(mouseX, mouseY);
    BACKGROUND = 255;
    r = 0;
    g = 0;
    b = 0;
    resetdelay = 0;
    play = true;
    menu = false;
    
    
    controls = "\n     \
--------------------------\n     \
          BASIC\n     \
--------------------------\n\n     \
left - add particle\n     \
right - pop particle\n     \
up - increase growthRate\n     \
down - increase growthRate\n\n     \
c - clean the sketchboard\n     \
r - reset\n\n     \
--------------------------\n     \
          COLOR\n     \
--------------------------\n\n     \
b - black\n     \
w - white\n\n     \
[ - add r\n     \
] - subtract r\n     \
; - add g\n     \
' - subtract g\n     \
. - add b\n     \
/ - subtract b\n\n     \
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
    text("h for help", 10, 15);
}


function draw() {
    if (resetdelay == 5 && frameCount%30==0){
        r = 255-r;
        g = 255-g;
        b = 255-b;
    }
    system.run();
    if (system.connectType != null) {system.connect()}
    
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
        system.drawType = 'line';
    }
    if (key =='d'){
        system.drawType = 'dot';
    }
    if (key == 'z'){
        system.sticks = !system.sticks;
    }
    if (key =='c'){
        background(BACKGROUND);
        if (menu){
            text(controls, 10, 25, 1000, 1000);
        }
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
    
    if (key == 'h'){
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