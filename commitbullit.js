    
    this.previousDistance = this.distanceFromSystem;
    this.wasGettingCloser = true;
    this.connectCount = this.system.connectCount;
    
    
//----------------------------------------
//               PARTICLE
// ----------------------------------------

let Particle = function(system) {
    this.system = system;
    this.drawType = this.system.drawType;
    this.growthRate = this.system.growthRate;
    this.connectType = "closest";

    this.routeTable = { 
        portOne: false, 
        portTwo: false,
        portThree: false };

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
    this.connectCount = this.system.connectCount;
    
    
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

//----------------------------------------
//               PARTICLE
// ----------------------------------------

let Particle = function(system) {
    this.system = system;
    this.drawType = this.system.drawType;
    this.growthRate = this.system.growthRate;
    this.connectType = "closest";

    this.routeTable = { 
        portOne: false, 
        portTwo: false,
        portThree: false };

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
    this.connectCount = this.system.connectCount;
    
    
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

//----------------------------------------
//               PARTICLE
// ----------------------------------------

let Particle = function(system) {
    this.system = system;
    this.drawType = this.system.drawType;
    this.growthRate = this.system.growthRate;
    this.connectType = "closest";

    this.routeTable = { 
        portOne: false, 
        portTwo: false,
        portThree: false };

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
    this.connectCount = this.system.connectCount;
    
    
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

//----------------------------------------
//               PARTICLE
// ----------------------------------------

let Particle = function(system) {
    this.system = system;
    this.drawType = this.system.drawType;
    this.growthRate = this.system.growthRate;
    this.connectType = "closest";

    this.routeTable = { 
        portOne: false, 
        portTwo: false,
        portThree: false };

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
    this.connectCount = this.system.connectCount;
    
    
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

    this.routeTable = { 
        portOne: false, 
        portTwo: false,
        portThree: false };

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
    this.connectCount = this.system.connectCount;
    
    
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
    if (this.drawType == 'dot'){
        ellipse(this.position.x, this.position.y, this.mass, this.mass);
    }
    else if(this.drawType == 'line'){
        strokeWeight(1);
        if (!this.system.sticks){

let Particle = function(system) {
    this.system = system;
    this.drawType = this.system.drawType;
    this.growthRate = this.system.growthRate;
    this.connectType = "closest";

    this.routeTable = { 
        portOne: false, 
        portTwo: false,
        portThree: false };

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
    this.connectCount = this.system.connectCount;
    
    
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
    this.connectCount = this.system.connectCount;
    
    
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
    if (this.drawType == 'dot'){
        ellipse(this.position.x, this.position.y, this.mass, this.mass);
    }
    else if(this.drawType == 'line'){
        strokeWeight(1);
        if (!this.system.sticks){
            line(this.previousPosition.x, this.previousPosition.y, this.position.x, this.position.y);
        }
        else{
            line(this.position.x, this.position.y, this.position.x+this.mass, this.position.y);
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
  
};

Particle.prototype.update = function() {
    
    this.previousDistance = this.distanceFromSystem;
    this.wasGettingCloser = true;
    this.connectCount = this.system.connectCount;
    
    
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
    if (this.drawType == 'dot'){
        ellipse(this.position.x, this.position.y, this.mass, this.mass);
    }
    else if(this.drawType == 'line'){
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
    let closest2;
    let closest3;
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
    if (this.drawType == 'dot'){
        ellipse(this.position.x, this.position.y, this.mass, this.mass);
    }
    else if(this.drawType == 'line'){
        strokeWeight(1);
        if (!this.system.sticks){
    this.growthRate = this.system.growthRate;
    this.connectType = "closest";

    this.routeTable = { 
        portOne: false, 
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
    } else {
        this.velocity.x += cos(this.angle)/(this.distanceFromSystem);
        this.velocity.y += sin(this.angle)/(this.distanceFromSystem);
    }
    
  
    this.previousPosition = createVector(this.position.x, this.position.y);
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    
