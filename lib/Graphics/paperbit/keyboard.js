"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaperbitKeyboard = void 0;
class PaperbitKeyboard {
    constructor(bit, sendEvent) {
        this.sendEvent = sendEvent;
        bit.canvas.onkeydown = e => { this.updateKey(e); this.sendEvent("keyDown"); };
        bit.canvas.onkeyup = e => { this.updateKey(e); this.sendEvent("keyUp"); };
    }
    updateKey(e) {
        if ([...e.key].length === 1 && !e.ctrlKey && !e.metaKey)
            this.sendEvent("keyPress");
    }
}
exports.PaperbitKeyboard = PaperbitKeyboard;
//# sourceMappingURL=keyboard.js.map