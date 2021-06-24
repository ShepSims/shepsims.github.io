};

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
let Particle = function(system) {
    this.system = system;
    this.drawType = this.system.drawType;
    this.growthRate = this.system.growthRate;
    this.connectType = "closest";
    
    
    this.distanceFromSystem = sqrt((this.position.x - this.system.position.x)*(this.position.x - this.system.position.x) + (this.position.y - this.system.position.y)*(this.position.y - this.system.position.y));
    
    this.angle = atan2(this.system.position.y - this.position.y, this.system.position.x - this.position.x);
    
    if (this.system.gravityType == true){
        this.velocity.x += cos(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
        this.velocity.y += sin(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
    } else {
        this.velocity.x += cos(this.angle)/(this.distanceFromSystem);
        this.velocity.y += sin(this.angle)/(this.distanceFromSystem);
    }
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
    
        portThree: false };

    this.position = createVector(this.system.position.x + random(-50,50), this.system.position.y+ random(-50,50));
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
  
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
    

Particle.prototype.update = function() {
    
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

    this.routeTable = { 
        portOne: false, 
        portTwo: false,
        portThree: false };

    this.position = createVector(this.system.position.x + random(-50,50), this.system.position.y+ random(-50,50));
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
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
    this.growthRate = this.system.growthRate;
    this.connectType = "closest";

    this.routeTable = { 
        portOne: false, 
        portTwo: false,
        portThree: false };

    this.position = createVector(this.system.position.x + random(-50,50), this.system.position.y+ random(-50,50));
    
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
  
};

Particle.prototype.update = function() {
    
    this.previousDistance = this.distanceFromSystem;
    this.wasGettingCloser = true;
    this.connectCount = this.system.connectCount;
    
    
    this.distanceFromSystem = sqrt((this.position.x - this.system.position.x)*(this.position.x - this.system.position.x) + (this.position.y - this.system.position.y)*(this.position.y - this.system.position.y));
    

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
    } else {
        this.velocity.x += cos(this.angle)/(this.distanceFromSystem);
        this.velocity.y += sin(this.angle)/(this.distanceFromSystem);
    }
    
  
  
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
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
  
};
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
    let distance = 100000;
    let distance2 = 100000;
    let distance3 = 100000;

    let i;
    for (i = 0;i<this.system.particles.length-1;i++) {
        particle = this.system.particles[i];
    this.connectType = "closest";

    this.routeTable = { 
        portOne: false, 
        portTwo: false,

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
    
    
//               PARTICLE
// ----------------------------------------

let Particle = function(system) {
    this.system = system;
    this.drawType = this.system.drawType;
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
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
  
};

Particle.prototype.update = function() {
    

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
  
};
    }
    
  
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

    this.position = createVector(this.system.position.x + random(-50,50), this.system.position.y+ random(-50,50));
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
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
        portTwo: false,
        portThree: false };

    this.position = createVector(this.system.position.x + random(-50,50), this.system.position.y+ random(-50,50));
    
    this.acceleration = createVector(0,0);
    } else {
        this.velocity.x += cos(this.angle)/(this.distanceFromSystem);
        this.velocity.y += sin(this.angle)/(this.distanceFromSystem);
    }
    
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
    let distance = 100000;
    let distance2 = 100000;
    let distance3 = 100000;

    let i;
    for (i = 0;i<this.system.particles.length-1;i++) {
        particle = this.system.particles[i];
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
    this.drawType = this.system.drawType;
    this.growthRate = this.system.growthRate;
    this.connectType = "closest";

    this.routeTable = { 
        portOne: false, 
        portTwo: false,
        portThree: false };
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
        this.velocity.x += cos(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
        this.velocity.y += sin(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
    } else {
        this.velocity.x += cos(this.angle)/(this.distanceFromSystem);
        this.velocity.y += sin(this.angle)/(this.distanceFromSystem);
    }
    
  
    this.previousPosition = createVector(this.position.x, this.position.y);
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    

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
    
    
    this.position = createVector(this.system.position.x + random(-50,50), this.system.position.y+ random(-50,50));
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
  
};


  
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
    let distance = 100000;
    let distance2 = 100000;
    let distance3 = 100000;

    let i;
    
    this.angle = atan2(this.system.position.y - this.position.y, this.system.position.x - this.position.x);
    
    if (this.system.gravityType == true){
        this.velocity.x += cos(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
        this.velocity.y += sin(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
    } else {
        this.velocity.x += cos(this.angle)/(this.distanceFromSystem);
        this.velocity.y += sin(this.angle)/(this.distanceFromSystem);
    }
    
  
    this.mass = 5;
  
};

Particle.prototype.update = function() {
    
    this.previousDistance = this.distanceFromSystem;
    this.wasGettingCloser = true;
    this.connectCount = this.system.connectCount;
    
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
    this.angle = atan2(this.system.position.y - this.position.y, this.system.position.x - this.position.x);
    
    if (this.system.gravityType == true){
        this.velocity.x += cos(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
        this.velocity.y += sin(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
    } else {

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
        portOne: false, 
        portTwo: false,
        portThree: false };

  
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
    let distance = 100000;
    let distance2 = 100000;
    let distance3 = 100000;
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
// ----------------------------------------

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
    this.routeTable = { 
        portOne: false, 
        portTwo: false,
        portThree: false };

    this.position = createVector(this.system.position.x + random(-50,50), this.system.position.y+ random(-50,50));
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
    
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

    this.position = createVector(this.system.position.x + random(-50,50), this.system.position.y+ random(-50,50));
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
  
};
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
    
    }
    
  
        this.velocity.x += cos(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
        this.velocity.y += sin(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
    } else {
        this.velocity.x += cos(this.angle)/(this.distanceFromSystem);
        this.velocity.y += sin(this.angle)/(this.distanceFromSystem);
    }
    

let Particle = function(system) {
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
    this.distanceFromSystem = 0;
    this.angle = 0;
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
  
};

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
    let distance = 100000;
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

    this.position = createVector(this.system.position.x + random(-50,50), this.system.position.y+ random(-50,50));
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
  
};

//----------------------------------------
//               PARTICLE
// ----------------------------------------

let Particle = function(system) {
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

  
    
    
    this.distanceFromSystem = sqrt((this.position.x - this.system.position.x)*(this.position.x - this.system.position.x) + (this.position.y - this.system.position.y)*(this.position.y - this.system.position.y));
    
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
    
  
    this.previousPosition = createVector(this.position.x, this.position.y);
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    

    this.growthRate = this.system.growthRate;
    this.connectType = "closest";

    this.routeTable = { 
        portOne: false, 
        portTwo: false,
        portThree: false };
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
    this.connectCount = this.system.connectCount;
    
    
    this.distanceFromSystem = sqrt((this.position.x - this.system.position.x)*(this.position.x - this.system.position.x) + (this.position.y - this.system.position.y)*(this.position.y - this.system.position.y));
    
    this.angle = atan2(this.system.position.y - this.position.y, this.system.position.x - this.position.x);
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
    
    
    this.distanceFromSystem = sqrt((this.position.x - this.system.position.x)*(this.position.x - this.system.position.x) + (this.position.y - this.system.position.y)*(this.position.y - this.system.position.y));
    
    this.angle = atan2(this.system.position.y - this.position.y, this.system.position.x - this.position.x);
    
    if (this.system.gravityType == true){
    this.mass = 5;
  
    
  
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
    let distance = 100000;
    let distance2 = 100000;
    let distance3 = 100000;

    let i;
    for (i = 0;i<this.system.particles.length-1;i++) {
        particle = this.system.particles[i];
        if (particle != this){
            partdist = sqrt((this.position.x - particle.position.x)*(this.position.x - particle.position.x) + (this.position.y - particle.position.y)*(this.position.y - particle.position.y));
            if (partdist<distance){
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
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
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
        portTwo: false,
        portThree: false };

    this.position = createVector(this.system.position.x + random(-50,50), this.system.position.y+ random(-50,50));
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
    this.past = [];
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
    this.angle = atan2(this.system.position.y - this.position.y, this.system.position.x - this.position.x);
    
    if (this.system.gravityType == true){
        this.velocity.x += cos(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
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

  
};

Particle.prototype.update = function() {
    
    this.previousDistance = this.distanceFromSystem;
    this.wasGettingCloser = true;
    this.connectCount = this.system.connectCount;
    
    
    this.distanceFromSystem = sqrt((this.position.x - this.system.position.x)*(this.position.x - this.system.position.x) + (this.position.y - this.system.position.y)*(this.position.y - this.system.position.y));
    
    this.angle = atan2(this.system.position.y - this.position.y, this.system.position.x - this.position.x);
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

  
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
  
};
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
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
        portTwo: false,
        portThree: false };

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
    this.system = system;
    this.drawType = this.system.drawType;
    this.growthRate = this.system.growthRate;
    this.connectType = "closest";

    this.routeTable = { 
        portOne: false, 
        portTwo: false,
    this.routeTable = { 
        portOne: false, 
        portTwo: false,
    
    if (this.system.gravityType == true){
        this.velocity.x += cos(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
        this.velocity.y += sin(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
    } else {
        this.velocity.x += cos(this.angle)/(this.distanceFromSystem);
        this.velocity.y += sin(this.angle)/(this.distanceFromSystem);
    }
    
  
    this.previousPosition = createVector(this.position.x, this.position.y);
    
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


  
    this.distanceFromSystem = 0;
    
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

    this.position = createVector(this.system.position.x + random(-50,50), this.system.position.y+ random(-50,50));
    
    this.velocity = createVector(0,0);
    
    this.velocity = createVector(0,0);
  
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
    if (this.system.gravityType == true){
        this.velocity.x += cos(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
        this.velocity.y += sin(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
    } else {
        this.velocity.x += cos(this.angle)/(this.distanceFromSystem);
        this.velocity.y += sin(this.angle)/(this.distanceFromSystem);
    }
    
  
    this.previousPosition = createVector(this.position.x, this.position.y);
    
    this.position.x += this.velocity.x;
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
    
    this.mass = 5;
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
    this.past = [];
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
    let distance = 100000;
    let distance2 = 100000;
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
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
    this.angle = 0;
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
  
};

Particle.prototype.update = function() {
    
    this.previousDistance = this.distanceFromSystem;
    this.wasGettingCloser = true;
    this.connectCount = this.system.connectCount;
    
    
    
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

Particle.prototype.update = function() {
    
    this.previousDistance = this.distanceFromSystem;
    this.wasGettingCloser = true;
    this.connectCount = this.system.connectCount;
    
    
    this.distanceFromSystem = sqrt((this.position.x - this.system.position.x)*(this.position.x - this.system.position.x) + (this.position.y - this.system.position.y)*(this.position.y - this.system.position.y));
    
    this.angle = atan2(this.system.position.y - this.position.y, this.system.position.x - this.position.x);
    
    if (this.system.gravityType == true){
        this.velocity.x += cos(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
        portTwo: false,
        portThree: false };

    this.position = createVector(this.system.position.x + random(-50,50), this.system.position.y+ random(-50,50));
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
    this.past = [];
    this.lifespan = 255;
    this.lifespan = 255;
    this.mass = 5;
  
};

Particle.prototype.update = function() {
    
    this.previousDistance = this.distanceFromSystem;
    this.wasGettingCloser = true;
    this.connectCount = this.system.connectCount;
    
    
  
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
        this.velocity.x += cos(this.angle)/(this.distanceFromSystem);
        this.velocity.y += sin(this.angle)/(this.distanceFromSystem);
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
    
    this.connectType = "closest";

    this.routeTable = { 
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
    
        portTwo: false,
        portThree: false };

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
    
  
    this.growthRate = this.system.growthRate;
    this.connectType = "closest";

    this.routeTable = { 
        portOne: false, 
        portTwo: false,
        portThree: false };

    this.position = createVector(this.system.position.x + random(-50,50), this.system.position.y+ random(-50,50));
    
    this.velocity = createVector(0,0);
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
    
    if (this.system.gravityType == true){
        this.velocity.x += cos(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
        this.velocity.y += sin(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
    } else {
        this.velocity.x += cos(this.angle)/(this.distanceFromSystem);
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
        this.velocity.y += sin(this.angle)/(this.distanceFromSystem);
    }
    
  
    this.previousPosition = createVector(this.position.x, this.position.y);
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    

    this.mass += this.system.growthRate;
    
    if (this.mass <=0){this.mass = .1;}

    this.connected=false;
    
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
    
    this.previousDistance = this.distanceFromSystem;
    this.wasGettingCloser = true;
    this.connectCount = this.system.connectCount;
    
    
    this.distanceFromSystem = sqrt((this.position.x - this.system.position.x)*(this.position.x - this.system.position.x) + (this.position.y - this.system.position.y)*(this.position.y - this.system.position.y));
    
    this.angle = atan2(this.system.position.y - this.position.y, this.system.position.x - this.position.x);
    
    if (this.system.gravityType == true){
        this.velocity.x += cos(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
        this.velocity.x += cos(this.angle)/(this.distanceFromSystem);
        this.velocity.y += sin(this.angle)/(this.distanceFromSystem);
    }
    
  
    this.previousPosition = createVector(this.position.x, this.position.y);
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    

    this.mass += this.system.growthRate;
  
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
    

    
    this.velocity = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
  
};

Particle.prototype.update = function() {
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
    this.system = system;
    this.drawType = this.system.drawType;
    this.growthRate = this.system.growthRate;
    this.connectType = "closest";

    this.routeTable = { 
        portOne: false, 
        portTwo: false,
        portThree: false };
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
    
    this.position = createVector(this.system.position.x + random(-50,50), this.system.position.y+ random(-50,50));
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
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
    let distance = 100000;
    let distance2 = 100000;
    let distance3 = 100000;

    let i;
    for (i = 0;i<this.system.particles.length-1;i++) {
        particle = this.system.particles[i];
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
    
  
Particle.prototype.update = function() {
    
    this.previousDistance = this.distanceFromSystem;
    this.wasGettingCloser = true;
    this.connectCount = this.system.connectCount;
    
    
    this.distanceFromSystem = sqrt((this.position.x - this.system.position.x)*(this.position.x - this.system.position.x) + (this.position.y - this.system.position.y)*(this.position.y - this.system.position.y));
    
    this.angle = atan2(this.system.position.y - this.position.y, this.system.position.x - this.position.x);
  
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
    let distance = 100000;
    let distance2 = 100000;
    let distance3 = 100000;

    let i;
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
    
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
  
    
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
    
    this.angle = atan2(this.system.position.y - this.position.y, this.system.position.x - this.position.x);
    
    if (this.system.gravityType == true){
        this.velocity.x += cos(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
        this.velocity.y += sin(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
    } else {
        this.velocity.x += cos(this.angle)/(this.distanceFromSystem);
        this.velocity.y += sin(this.angle)/(this.distanceFromSystem);
    }
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
    
    
    this.angle = atan2(this.system.position.y - this.position.y, this.system.position.x - this.position.x);

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
        this.velocity.x += cos(this.angle)/(this.distanceFromSystem);
        this.velocity.y += sin(this.angle)/(this.distanceFromSystem);
    }
    
  
    this.previousPosition = createVector(this.position.x, this.position.y);
    
    this.routeTable = { 
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
    let distance = 100000;
    let distance2 = 100000;
    let distance3 = 100000;

    let i;
    for (i = 0;i<this.system.particles.length-1;i++) {
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
    this.routeTable = { 
        portOne: false, 
        portTwo: false,
        portThree: false };

    this.position = createVector(this.system.position.x + random(-50,50), this.system.position.y+ random(-50,50));
    
let Particle = function(system) {
    this.system = system;
    this.drawType = this.system.drawType;
    this.growthRate = this.system.growthRate;
    this.connectType = "closest";

    this.routeTable = { 
        portOne: false, 
        portTwo: false,
        portThree: false };
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
    this.connectCount = this.system.connectCount;
    
    
    this.distanceFromSystem = sqrt((this.position.x - this.system.position.x)*(this.position.x - this.system.position.x) + (this.position.y - this.system.position.y)*(this.position.y - this.system.position.y));
    
    this.angle = atan2(this.system.position.y - this.position.y, this.system.position.x - this.position.x);
    
    if (this.system.gravityType == true){
        this.velocity.x += cos(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
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
    
// ----------------------------------------

let Particle = function(system) {
    this.system = system;
    this.drawType = this.system.drawType;
    this.growthRate = this.system.growthRate;
// ----------------------------------------

let Particle = function(system) {
    this.system = system;
    this.drawType = this.system.drawType;
    this.growthRate = this.system.growthRate;
    this.connectType = "closest";

    this.routeTable = { 
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
    this.drawType = this.system.drawType;
    this.growthRate = this.system.growthRate;
    this.connectType = "closest";

    this.routeTable = { 
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
  
};

Particle.prototype.update = function() {
    
    this.previousDistance = this.distanceFromSystem;
    this.wasGettingCloser = true;
    this.connectCount = this.system.connectCount;
    
    
    this.distanceFromSystem = sqrt((this.position.x - this.system.position.x)*(this.position.x - this.system.position.x) + (this.position.y - this.system.position.y)*(this.position.y - this.system.position.y));
    

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
    
    this.connectType = "closest";

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
    let distance = 100000;
    let distance2 = 100000;
    let distance3 = 100000;
        this.velocity.y += sin(this.angle)/(this.distanceFromSystem);
    }
    
  
    this.previousPosition = createVector(this.position.x, this.position.y);
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
        this.velocity.y += sin(this.angle)/(this.distanceFromSystem);
    }
    
  
    this.previousPosition = createVector(this.position.x, this.position.y);
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    

    this.mass += this.system.growthRate;
    
    if (this.mass <=0){this.mass = .1;}

    this.connected=false;
    
};

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
    
    this.routeTable = { 
        portOne: false, 
        portTwo: false,
        portThree: false };

    this.position = createVector(this.system.position.x + random(-50,50), this.system.position.y+ random(-50,50));
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    
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
    
    this.angle = atan2(this.system.position.y - this.position.y, this.system.position.x - this.position.x);
    
    if (this.system.gravityType == true){
        this.velocity.x += cos(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
        this.velocity.y += sin(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
    } else {
        this.velocity.x += cos(this.angle)/(this.distanceFromSystem);
        this.velocity.y += sin(this.angle)/(this.distanceFromSystem);
    }
    
//               PARTICLE
// ----------------------------------------

let Particle = function(system) {
    this.system = system;
    this.drawType = this.system.drawType;
    this.growthRate = this.system.growthRate;
    this.connectType = "closest";

    this.routeTable = { 
  
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
        this.velocity.y += sin(this.angle)*this.distanceFromSystem*this.distanceFromSystem/100000;
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
    
  
};

Particle.prototype.update = function() {
    
    this.previousDistance = this.distanceFromSystem;
    this.wasGettingCloser = true;
    this.connectCount = this.system.connectCount;
    
    
        portThree: false };

    this.position = createVector(this.system.position.x + random(-50,50), this.system.position.y+ random(-50,50));
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
        portThree: false };

    this.position = createVector(this.system.position.x + random(-50,50), this.system.position.y+ random(-50,50));
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
        portTwo: false,
        portThree: false };

    this.position = createVector(this.system.position.x + random(-50,50), this.system.position.y+ random(-50,50));
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
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
// ----------------------------------------

    this.routeTable = { 
        portOne: false, 
  
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
    
    this.growthRate = this.system.growthRate;
    this.connectType = "closest";

    this.routeTable = { 
        portOne: false, 
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
    
  
    this.previousPosition = createVector(this.position.x, this.position.y);
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    

    this.mass += this.system.growthRate;
    
    if (this.mass <=0){this.mass = .1;}

    this.connected=false;
    
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
  
    this.distanceFromSystem = 0;
    this.angle = 0;
  
    this.past = [];
    this.lifespan = 255;
    this.mass = 5;
  
};

Particle.prototype.update = function() {
    
    this.previousDistance = this.distanceFromSystem;
};

Particle.prototype.update = function() {
    
    this.previousDistance = this.distanceFromSystem;
    this.wasGettingCloser = true;
    this.connectCount = this.system.connectCount;
    
    
    this.distanceFromSystem = sqrt((this.position.x - this.system.position.x)*(this.position.x - this.system.position.x) + (this.position.y - this.system.position.y)*(this.position.y - this.system.position.y));
    
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
