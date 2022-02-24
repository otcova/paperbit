"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaperbitKeyboard = void 0;
class PaperbitKeyboard {
    constructor(bit, publishEvent) {
        this.publishEvent = publishEvent;
        bit.graphics.canvas.onkeydown = e => { this.updateKey(e); this.publishEvent("keyDown"); };
        bit.graphics.canvas.onkeyup = e => { this.updateKey(e); this.publishEvent("keyUp"); };
    }
    updateKey(e) {
        if ([...e.key].length === 1 && !e.ctrlKey && !e.metaKey)
            this.publishEvent("keyPress");
    }
}
exports.PaperbitKeyboard = PaperbitKeyboard;
//# sourceMappingURL=keyboard.js.map