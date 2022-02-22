export class Graphics2d {
    constructor() {
    }
    rect(x, y, width, height) {
        height || (height = width);
    }
    ellipse(x, y, width, height) {
        height || (height = width);
    }
    rotateDegrees(angle) {
    }
    rotateRadians(angle) {
    }
    translate(x, y) {
    }
    scale(x, y) {
        y || (y = x);
    }
}
