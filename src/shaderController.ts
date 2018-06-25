import { ChildProcess } from 'child_process';

export class ShaderController {

    private process: ChildProcess = null;
    private childProcess = require('child_process');

    public openShader(glslFileName: String) {
        if (this.process) {
            this.process.kill();
        }
        this.process = this.childProcess.spawn('glslViewer', [glslFileName]);
    }
}