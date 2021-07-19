//----------------------------------------
//               SYSTEM
// ----------------------------------------

let System = function(x, y){
    this.drawType = 'line';
    this.gravityType = 1   // ['normal', 'invert', 'userPoints', 'middle 4']
    this.trace = true;
    this.detached = false;
    this.sticks = false;
    this.pairs = false;

    this.connectType = null;
    this.connectCount = 1;
    
    this.position=createVector(x,y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.mass = 0;
    this.growthRate = .01;
           
    this.particles = [];

    this.gravityPoints = [];
  
};



System.prototype.run = function() {

    // If not tracing, reset background and redisplay menu
    if (!this.trace){
        background(BACKGROUND);
        if (menu){
        text(controls, 10, 25, 1000, 1000);
    }
    }
    
    // Set system position
    this.position.x = mouseX;
    this.position.y = mouseY;

    // Update Particles positions and display
    for (let i =  this.particles.length-1; i >= 0; i--) {
        let particle = this.particles[i];
        particle.update();
        particle.display();
        particle.routeTable = { 
            portOne: false, 
            portTwo: false,
            portThree: false };

        // increment system mass
        this.mass += particle.mass;
    }
    // 
    this.mass /= this.particles.length/5;
};

System.prototype.connect = function() {
    
    for (let i =  this.particles.length-1; i >= 0; i--) {

        // Select particle
        let p = this.particles[i];


        if (this.connectType == "closest"){
            // if closest connections enabled, get particles nearest neighbor
            let connections = p.getClosest(); 
            if (connections){ 
                let j = 0;
                for (let point in connections){
                    line(p.position.x, p.position.y, connections[point].position.x, connections[point].position.y);
                }
            } 
        } else if (this.connectType == "pairs") {
            this.pair();
        }
    }


}

  System.prototype.pair = function() {
    var i;

    //Loop through particles
    for (i=0;i<this.particles.length-1;i++){
        p = this.particles[i];

        // If the particle has open ports try to fill them up to capacity
        if (p.routeTable.portOne == false) {

            // Check if next particle has any open ports and connect if so
            p2 = this.particles[i+1];

            for (let port in p2.routeTable){ 
                if (p2.routeTable[port] == false){
                    line(p.position.x, p.position.y, p2.position.x, p2.position.y)
                    p.routeTable.portOne = true;
                    port = true;
                }
            }
        } else if ( p.routeTable.portTwo == false && this.connectCount > 1 && i < this.particles.length-2) {

            // Check if super next particle has any open ports and connect if so
            p2 = this.particles[i+2];
            for (let port in p2.routeTable){ 
                if (p2.routeTable[port] == false){
                    line(p.position.x, p.position.y, p2.position.x, p2.position.y)
                    p.routeTable.portTwo = true;
                    port = true;
                }
            }
        } else if ( p.routeTable.portThree == false && this.connectCount > 2 && i < this.particles.length-3) {

            // Check if super super next particle has any open ports and connect if so
            p2 = this.particles[i+3];
            for (let port in p2.routeTable){ 
                if (p2.routeTable[port] == false){
                    line(p.position.x, p.position.y, p2.position.x, p2.position.y)
                    p.routeTable.portThree = true;
                    port = true;
                }
            }
        }
        i+=1;
    };
}
  
System.prototype.addParticle = function() {
    this.particles.push(new Particle(this));
};

System.prototype.popParticle = function() {
    if (this.particles.length > 0) {
        this.particles.shift();    
    }
};
  
System.prototype.addGravityPoint = function() {
    x = mouseX
    y = mouseY
    this.gravityPoints = append(this.gravityPoints, createVector(x, y))
};

System.prototype.removeGravityPoint = function() {
    this.gravityPoints = shorten(this.gravityPoints)
};