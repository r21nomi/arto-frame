"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
class Main {
    constructor() {
        const server = new server_1.Server();
        server.start();
    }
}
const main = new Main();
//# sourceMappingURL=app.js.map