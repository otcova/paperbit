export class Paperbit {
    constructor() {
        this.graphics = [];
    }
    pushGraphics(graphics) {
        this.graphics.push(graphics);
        return graphics;
    }
}
export class Graphics2d {
    constructor() {
    }
    rect(x, y, width, height) {
        height || (height = width);
    }
    translate(x, y) {
    }
}
export class Graphics3d {
}
