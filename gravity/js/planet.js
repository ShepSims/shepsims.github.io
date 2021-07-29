//----------------------------------------
//               PLANET
// ----------------------------------------

let Planet = function(system) {
    this.system = system;
    this.drawType = this.system.drawType;


    this.position = this.system.gravityType == 1 ? createVector(mouseX, mouseY) : createVector(this.system.position.x + random(-5,5), this.system.position.y+ random(-5,5));
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

  
    this.distanceFromSystem = 0;
    this.angleFromCursor = 0;
  
    this.mass = 5;
  
};

Planet.prototype.update = function() {
    
    if (this.system.cursorGravity == true && this.system.gravityType == 1) {
        this.distanceFromSystem = sqrt((this.position.x - this.system.position.x)*(this.position.x - this.system.position.x) + (this.position.y - this.system.position.y)*(this.position.y - this.system.position.y));
        this.angleFromCursor = atan2(this.system.position.y - this.position.y, this.system.position.x - this.position.x);
        this.velocity.x += cos(this.angleFromCursor)*this.distanceFromSystem*this.distanceFromSystem/100000;
        this.velocity.y += sin(this.angleFromCursor)*this.distanceFromSystem*this.distanceFromSystem/100000;
    } 
    
    else if (this.system.cursorGravity == true && this.system.gravityType == 2){
        this.distanceFromSystem = sqrt((this.position.x - this.system.position.x)*(this.position.x - this.system.position.x) + (this.position.y - this.system.position.y)*(this.position.y - this.system.position.y));
        this.angleFromCursor = atan2(this.system.position.y - this.position.y, this.system.position.x - this.position.x);
        this.velocity.x += cos(this.angleFromCursor)/(this.distanceFromSystem);
        this.velocity.y += sin(this.angleFromCursor)/(this.distanceFromSystem);
    }
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    
};


Planet.prototype.display = function() {
    stroke(color(r,g,b));
    fill(color(r,g,b));
    ellipse(this.position.x, this.position.y, this.mass, this.mass);
  
};