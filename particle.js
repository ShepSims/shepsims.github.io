//----------------------------------------
//               PARTICLE
// ----------------------------------------

let Particle = function(system) {
  this.system = system;
  
  this.position = createVector(this.system.position.x, this.system.position.y);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
  
  this.distanceFromSystem = 0;
  this.angle = 0;
  
  this.lifespan = 255;
  this.mass = 1;
  
};

Particle.prototype.update = function() {
  
  this.color = createVector(0,0,0);
  
  this.distanceFromSystem = sqrt((this.position.x - this.system.position.x)*(this.position.x - this.system.position.x) + (this.position.y - this.system.position.y)*(this.position.y - this.system.position.y));
  this.angle = atan2(this.system.position.y - this.position.y, this.system.position.x - this.position.x);
  
  this.velocity.x += cos(this.angle)*this.distanceFromSystem*this.distanceFromSystem*this.system.gravity/100000;
  this.velocity.y += sin(this.angle)*this.distanceFromSystem*this.distanceFromSystem*this.system.gravity/100000;
  
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
  
  
  this.lifespan-=2;
  
  if (this.lifespan <= 1){
    this.explode();
  }
  this.mass += 0.05;
};


Particle.prototype.display = function() {
  fill(this.distanceFromSystem, this.distanceFromSystem%3, this.distanceFromSystem%4);
  stroke(this.distanceFromSystem%2);
  ellipse(this.position.x, this.position.y, this.mass, this.mass);
};

Particle.prototype.explode = function(){
  ellipse(this.position.x, this.position.y, 10, 10);
};
