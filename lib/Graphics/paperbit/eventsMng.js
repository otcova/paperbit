"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaperbitEventsBase = void 0;
const graphicsAPI_1 = require("../api/graphicsAPI");
class PaperbitEventsBase extends graphicsAPI_1.GraphicsAPI {
    constructor() {
        super(...arguments);
        this.eventCallbacks = {};
    }
    sendEvent(name) {
        return new Promise(async (resolve) => {
            var _a;
            for (const callback of (_a = this.eventCallbacks[name]) !== null && _a !== void 0 ? _a : [])
                await callback(this.paperbit);
            resolve();
        });
    }
    on(name, callback) {
        var _a;
        var _b;
        (_b = this.eventCallbacks)[name] || (_b[name] = []);
        (_a = this.eventCallbacks[name]) === null || _a === void 0 ? void 0 : _a.push(callback);
    }
}
exports.PaperbitEventsBase = PaperbitEventsBase;
//# sourceMappingURL=eventsMng.js.map