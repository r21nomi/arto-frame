"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ShaderController {
    openShader(glslFileName) {
        const exec = require('child_process').exec;
        exec(`glslViewer ${glslFileName}`, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
            }
            console.log(stdout);
        });
    }
}
exports.ShaderController = ShaderController;
//# sourceMappingURL=shaderController.js.map