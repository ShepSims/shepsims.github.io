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
