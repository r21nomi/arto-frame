"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const shaderController_1 = require("./shaderController");
class Server {
    constructor() {
        this.FRAGMENT_SHADER_SAMPLE = `#ifdef GL_ES
            precision mediump float;
            #endif
            
            #extension GL_OES_standard_derivatives : enable
            
            uniform float u_time;
            uniform vec2 u_resolution;
            
            float random(in vec2 uv){
                    return fract(sin(dot(uv, vec2(12.9898,78.233))) * 43758.5453);
            }
            
            float circle(vec2 uv, float radius) {
                    return step(radius, length(uv));
            }
            
            void main( void ) {
                    vec2 uv = (gl_FragCoord.xy * 2.0 -  u_resolution.xy) / min(u_resolution.x, u_resolution.y);
            
                    uv.x += u_time * 0.2;
            
                    vec2 scaledUv = uv * 3.0;
                    vec2 repeatedUv = fract(scaledUv);
                    repeatedUv -= 0.5;
            
                    float randomOffset = random(floor(scaledUv)) + 0.5;
                    float distortion = (repeatedUv.x + sin(repeatedUv.y * 13.0 + (u_time * 12.0 * randomOffset))) * 0.04;
            
                    repeatedUv.x += distortion;
            
                    vec2 circleUv1 = repeatedUv - vec2(0.0, distortion);
                    vec2 circleUv2 = repeatedUv + vec2(0.0, distortion);
                    vec2 circleUv3 = repeatedUv + vec2(distortion, 0.0);
            
                    vec3 color = vec3(
                            circle(circleUv1, 0.44),
                            1.0 - circle(circleUv2, 0.28),
                            circle(circleUv3, 0.39)
                    );
            
                    gl_FragColor = vec4(color, 1.0);
            }`;
        this.fs = require('fs');
        this.shaderController = new shaderController_1.ShaderController();
    }
    start() {
        const server = http.createServer((request, response) => {
            if (request.url == '/favicon.ico') {
                return;
            }
            this.requestHandler(request, response);
        });
        server.listen('5000');
    }
    requestHandler(request, response) {
        response.end('Displaying shader art...');
        let fileName = 'glsl/sample.frag';
        this.fs.writeFile(fileName, this.FRAGMENT_SHADER_SAMPLE, (err) => {
            if (err) {
                console.log('failed');
                throw err;
            }
            else {
                console.log('success');
                this.shaderController.openShader(fileName);
            }
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map