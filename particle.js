//----------------------------------------
//               PARTICLE
// ----------------------------------------

let Particle = function(system) {
    this.system = system;
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
    
    // Set gettingCloser
    if (this.previousDistance > this.distanceFromSystem) {
        this.gettingCloser = true;
    }
    else{
        this.gettingCloser = false;
    }
    
    // If was getting closer and is getting closer, no change
    // If was getting closer and is getting further, toggle 
    // If was not getting closer and is getting closer, toggle
    // If was not getting closer and is not getting closer, no change
    
    // Care about every 2 toggles
    if (this.gettingCloser && this.wasGettingCloser){
        this.count +=1
        if (this.count %2==0 && this.toggle == true){
            this.growthRate = abs(this.growthRate);
            this.toggle = false;
        }
        else if (this.count % 2 ==0 ) {
            this.growthRate -abs(this.growthRate);
        }
    }
    
    this.angle = atan2(this.system.position.y - this.position.y, this.system.position.x - this.position.x);
  
    this.velocity.x += cos(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
    this.velocity.y += sin(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
  
    this.previousPosition = createVector(this.position.x, this.position.y);
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    
    if (this.mass > abs(this.growthRate)){ 
        this.mass += this.growthRate;
        }
    
};


Particle.prototype.display = function() {
    if (this.system.type == 'dot'){
        ellipse(this.position.x, this.position.y, this.mass, this.mass);
    }
    else if(this.system.type == 'line'){
        strokeWeight(1);
        stroke(255);
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
