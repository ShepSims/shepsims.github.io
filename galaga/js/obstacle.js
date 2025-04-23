class Obstacle {
    constructor(x, y, width, height, type = 'solid') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type; // 'solid', 'platform', 'spike', etc.
        this.color = '#8B4513'; // Brown color for obstacles
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    // Check if a point (x,y) is inside this obstacle
    contains(x, y) {
        return x >= this.x && x <= this.x + this.width &&
               y >= this.y && y <= this.y + this.height;
    }

    // Check if a circle (for player/enemy collision) intersects with this obstacle
    intersects(x, y, radius) {
        // Find the closest point on the obstacle to the circle
        let closestX = Math.max(this.x, Math.min(x, this.x + this.width));
        let closestY = Math.max(this.y, Math.min(y, this.y + this.height));
        
        // Calculate the distance between the circle's center and this closest point
        let distanceX = x - closestX;
        let distanceY = y - closestY;
        
        // If the distance is less than the circle's radius, there's a collision
        return (distanceX * distanceX + distanceY * distanceY) < (radius * radius);
    }
} 