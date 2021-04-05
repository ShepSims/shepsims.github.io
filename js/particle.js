//----------------------------------------
//               PARTICLE
// ----------------------------------------

let Particle = function(system) {
    this.system = system;
    this.type = this.system.type;
    this.growthRate = this.system.growthRate;
  
    this.position = createVector(this.system.position.x, this.system.position.y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
  
};

Particle.prototype.update = function() {
    this.color = createVector(0,0,0);
    
    this.previousDistance = this.distanceFromSystem;
    this.wasGettingCloser = true;
    
    
    this.distanceFromSystem = sqrt((this.position.x - this.system.position.x)*(this.position.x - this.system.position.x) + (this.position.y - this.system.position.y)*(this.position.y - this.system.position.y));
    
    this.angle = atan2(this.system.position.y - this.position.y, this.system.position.x - this.position.x);
  
    this.velocity.x += cos(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
    this.velocity.y += sin(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
  
    this.previousPosition = createVector(this.position.x, this.position.y);
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    

    this.mass += this.system.growthRate;
    
    if (this.mass <=0){this.mass = .1;}
    
};


Particle.prototype.display = function() {
    if (this.type == 'dot'){
        stroke(0);
        ellipse(this.position.x, this.position.y, this.mass, this.mass);
    }
    else if(this.type == 'line'){
        strokeWeight(10);
        stroke(0);
        line(this.previousPosition.x, this.previousPosition.y, this.position.x, this.position.y)
    }
    else if(this.system.trace == false){
        background(255);
    }
  
};

Particle.prototype.branch = function(){
    this.system.
    ellipse(this.position.x, this.position.y, 10, 10);
};
