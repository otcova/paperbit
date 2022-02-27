"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaperbitKeyboard = void 0;
class PaperbitKeyboard {
    // private publishEvent
    constructor(cavnas) {
        this.keys = new Map();
        this.typed = "";
        // this.publishEvent = publishEvent
        // bit.graphics.canvas.onkeydown = e => { this.updateKey(e); this.publishEvent("keyDown") }
        // bit.graphics.canvas.onkeyup = e => { this.updateKey(e); this.publishEvent("keyUp") }
    }
    updateKey(e) {
        // if ([...e.key].length === 1 && !e.ctrlKey && !e.metaKey) this.publishEvent("keyPress")
    }
    pullData() {
        const data = { keys: this.keys, typed: this.typed };
        this.keys = new Map();
        this.typed = "";
        return data;
    }
}
exports.PaperbitKeyboard = PaperbitKeyboard;
//# sourceMappingURL=keyboard.js.map