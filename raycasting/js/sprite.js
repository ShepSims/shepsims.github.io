class Sprite {
    constructor() {
        this.fov = 30;
        this.pos = createVector(100, 100);
        this.rays = [];
        this.heading = 0;
        this.density = 1;
        for (let a = -this.fov/2; a<this.fov/2; a+=this.density){
            this.rays.push(new Ray(this.pos, radians(a)));
        }
    }

    look(walls) {

        // Reset scene
        const scene = [];

        //Loop through rays and find closest wall
        for (let i = 0; i < this.rays.length; i++){
            let ray = this.rays[i];
            let closest_wall = null;
            let wall_distance = Infinity;

            // Check each wall for intersection point, if distance to this
            // point is closet than previous closest, set closest wall to 
            // that one and record its distance
            for (let wall of walls){
                const point = ray.cast(wall);
                if (point){
                    let dist = p5.Vector.dist(this.pos, point);
                    if (dist < wall_distance) {
                        wall_distance = dist;
                        closest_wall = point;
                    }
                }
            }

            if (closest_wall){
                
                line(this.pos.x, this.pos.y, closest_wall.x, closest_wall.y)
            } 
            scene[i] = wall_distance;

        }
        return scene;
    }

    updateFOV(fov) {
        this.fov = fov;
        this.rays = []; 
        for (let a = -this.fov / 2; a < this.fov / 2; a += this.density){
            this.rays.push(new Ray(this.pos, radians(a) + this.heading));
        }
    }


    // rotate
    rotate(angle) {
        this.heading += angle;
        let index = 0;
        for (let a = -this.fov/2; a<this.fov/2; a+=this.density){
            this.rays[index].setAngle( radians(a) + this.heading);     
            index += 1;   
        }
    }

    move(dist) {
        const displacement_vector = p5.Vector.fromAngle(this.heading);
        displacement_vector.setMag(dist);
        this.pos.add(displacement_vector);
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        for (let ray of this.rays){
            ray.show();
        }
    }
}