//----------------------------------------
//               SYSTEM
// ----------------------------------------

let System = function(x, y){
    this.type = 'line';
    this.gravityType = true;
    this.trace = true;
    this.detached = false;
    this.sticks = false;
    this.connected = false;
    this.closest = false;
    
    this.position=createVector(x,y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.mass = 0;
    this.growthRate = .01;
           
    this.particles = [];
  
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

        // if closest connections enabled, get particles nearest neighbor
        if (this.closest) { particle.getClosest(); }
    
        //
        this.mass += particle.mass;
    }
    this.mass /= this.particles.length/5;
    if (this.connected==true){
        this.connect()
    }
};

  System.prototype.connect = function() {
    var i;

    for (i=0;i<this.particles.length-1;i++){
        p = this.particles[i];
        p2 = this.particles[i+1];
        if (p.connected == false) {
            try {
                line(p.position.x, p.position.y, p2.position.x, p2.position.y)
                p.connected =true;
                p2.connected =true;
            } catch {
                break;
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
  
