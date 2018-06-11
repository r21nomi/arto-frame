import { ChildProcess } from "child_process";

export class ShaderController {
    private exec = require('child_process').exec;
    private process: ChildProcess = null;

    public openShader(glslFileName: String) {
        if (this.process) {
            // FIXME: An error will be thrown.
            this.process.kill();
        }
        this.process = this.exec(`glslViewer ${glslFileName}`, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
            }
            console.log(stdout);
        });
    }
}