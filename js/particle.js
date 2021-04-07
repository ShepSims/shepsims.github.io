//----------------------------------------
//               PARTICLE
// ----------------------------------------

let Particle = function(system) {
    this.system = system;
    this.type = this.system.type;
    this.growthRate = this.system.growthRate;
    this.connected = false;
    this.position = createVector(this.system.position.x + random(-50,50), this.system.position.y+ random(-50,50));
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
  
};

Particle.prototype.update = function() {
    
    this.previousDistance = this.distanceFromSystem;
    this.wasGettingCloser = true;
    
    
    this.distanceFromSystem = sqrt((this.position.x - this.system.position.x)*(this.position.x - this.system.position.x) + (this.position.y - this.system.position.y)*(this.position.y - this.system.position.y));
    
    this.angle = atan2(this.system.position.y - this.position.y, this.system.position.x - this.position.x);
    
    if (this.system.gravityType == true){
        this.velocity.x += cos(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
        this.velocity.y += sin(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
    } else {
        this.velocity.x += cos(this.angle)/(this.distanceFromSystem);
        this.velocity.y += sin(this.angle)/(this.distanceFromSystem);
    }
    
  
    this.previousPosition = createVector(this.position.x, this.position.y);
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    

    this.mass += this.system.growthRate;
    
    if (this.mass <=0){this.mass = .1;}

    this.connected=false;
    
};


Particle.prototype.display = function() {
    stroke(color(r,g,b));
    fill(color(r,g,b));
    if (this.type == 'dot'){
        ellipse(this.position.x, this.position.y, this.mass, this.mass);
    }
    else if(this.type == 'line'){
        strokeWeight(1);
        if (!this.system.sticks){
            line(this.previousPosition.x, this.previousPosition.y, this.position.x, this.position.y);
        }
        else{
            line(this.position.x, this.position.y, this.position.x+this.mass, this.position.y);
        }
    }
  
};

Particle.prototype.getClosest = function() {
    let closest;
    let distance = 100000;
    let i;
    for (i = 0;i<this.system.particles.length-1;i++) {
        particle = this.system.particles[i];
        if (particle != this){
            partdist = sqrt((this.position.x - particle.position.x)*(this.position.x - particle.position.x) + (this.position.y - particle.position.y)*(this.position.y - particle.position.y));
            if (partdist<distance){
                distance=partdist;
                closest = particle;
        }
        }
        
    };
    if (closest){line(this.position.x, this.position.y, closest.position.x, closest.position.y);}
}
