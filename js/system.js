//----------------------------------------
//               SYSTEM
// ----------------------------------------

let System = function(x, y){
    this.type = 'dot';
    this.gravityType = true;
    this.trace = false;
    this.detached = false;
    this.sticks = false;
    
    this.position=createVector(x,y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.mass = 0;
    this.growthRate = .01;
           
    this.particles = [];
  
};



System.prototype.run = function() {
    if (this.trace == false) {
        background(BACKGROUND);
    }
    this.position.x = mouseX;
    this.position.y = mouseY;
    for (let i =  this.particles.length-1; i >= 0; i--) {
    let particle = this.particles[i];
    particle.update();
    particle.display();
    this.mass += particle.mass;
   this.mass/=this.particles.length/5;
  }};
  
System.prototype.addParticle = function() {
    this.particles.push(new Particle(this));
};

System.prototype.popParticle = function() {
    if (this.particles.length > 0) {
        this.particles.shift();    
    }
};

System.prototype.break = function() {
    
};
  
