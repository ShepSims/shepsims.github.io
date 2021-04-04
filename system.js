//----------------------------------------
//               SYSTEM
// ----------------------------------------

let System = function(x, y){
  this.position=createVector(x,y);
  this.detached = false;
  this.mass = 0;
  this.gravity = 1
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
  this.trace = false;
  this.particles = [];
  
};

System.prototype.run = function(x, y) {
  this.position.x = x;
  this.position.y = y;
  for (let i =  this.particles.length-1; i >= 0; i--) {
    let particle = this.particles[i];
    particle.update();
    particle.display();
    this.mass += particle.mass;
   this.mass/=this.particles.length/5;
  }
};
  
System.prototype.addParticle = function() {
  this.particles.push(new Particle(this));
};

System.prototype.popParticle = function() {
  popped = this.particles.pop();
  popped.explode();
};
  
