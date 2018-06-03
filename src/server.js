"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const shaderController_1 = require("./shaderController");
class Server {
    constructor() {
        this.shaderController = new shaderController_1.ShaderController();
    }
    start() {
        const server = http.createServer((request, response) => {
            this.requestHandler(request, response);
        });
        server.listen('5000');
    }
    requestHandler(request, response) {
        response.end('Displaying shader art...');
        this.shaderController.openShader('glsl/sample.frag');
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map