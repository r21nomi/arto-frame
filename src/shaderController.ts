export class ShaderController {
    public openShader(glslFileName: String) {
        const exec = require('child_process').exec;
        exec(`glslViewer ${glslFileName}`, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
            }
            console.log(stdout);
        });
    }
}