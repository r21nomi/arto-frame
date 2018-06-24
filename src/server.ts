import * as http from 'http';
import { ShaderController } from './shaderController';
import { GLSLFormatConverter } from './glslFormatConverter';
import * as firebase from 'firebase';
import {urlProvider} from "./urlProvider";
import {handleErrors} from "./handleErrors";
import {ArtCodeEntity, CodeType} from "./entity";

export class Server {

    private FRAGMENT_SHADER_SAMPLE: String = `#ifdef GL_ES
precision mediump float;
#endif
#extension GL_OES_standard_derivatives : enable
const float EPS = 0.0001;
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
float exposeInOut(float t) {
	if (t == 0.0) {
		return 0.0;
	
	} else if (t == 1.0) {
		return 1.0;
	
	} else if ((t /= 0.5) < 1.0) {
		return 0.5 * pow(2.0, 10.0 * (t - 1.0));
	
	} else {
		return 0.5 * (-pow(2.0, -10.0 * --t) + 2.0);
	}
}
float map(float value, float beforeMin, float beforeMax, float afterMin, float afterMax) {
	return afterMin + (afterMax - afterMin) * ((value - beforeMin) / (beforeMax - beforeMin));
}
vec3 repetition(vec3 ray, float offset) {
	vec3 repeatedRay = mod(ray, offset) - offset / 2.0;
	return vec3(repeatedRay.x, repeatedRay.y, repeatedRay.z);
}
float barDist(vec2 st, float width) {
	return length(max(abs(st) - width, 0.0));
}
float sceneDist(vec3 ray) {
	vec3 repeatedRay1 = repetition(ray, 1.0);
	vec3 repeatedRay2 = repetition(ray, 1.0);
	float barDistance = barDist(repeatedRay1.yz, 0.1);
	float barDistance2 = barDist(repeatedRay2.xz, 0.1);
	
	float result = min(barDistance, barDistance2);
	
	return result;
}
vec3 getNormal(vec3 p){
	return normalize(vec3(
		sceneDist(p + vec3(EPS, 0.0, 0.0)) - sceneDist(p + vec3(-EPS, 0.0, 0.0)),
		sceneDist(p + vec3(0.0,  EPS, 0.0)) - sceneDist(p + vec3(0.0,  -EPS, 0.0)),
		sceneDist(p + vec3(0.0, 0.0,  EPS)) - sceneDist(p + vec3(0.0, 0.0,  -EPS))
	));
}
void main( void ) {
	vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	
	float t = time * 0.5;
	float step = 1.0;
	float easing =  exposeInOut(fract(t));
	float speed = (floor(t) + easing) * step;
	
	vec3 cameraPosition = vec3(speed,  0.0, -time);
	vec3 cameraDirection = vec3(0.0,  0.0, -1.0);
	vec3 cameraUp  = vec3(0.0,  1.0,  0.0);
	vec3 cameraSide = cross(cameraDirection, cameraUp);
	float targetDepth = 1.0;
	
	vec3 ray = normalize(cameraSide * st.x + cameraUp * st.y + cameraDirection * targetDepth);
	
	vec3 rayPosition = cameraPosition;
	float distance = 0.0;
	float currentRayLength = 0.0;
	bool hit = false;
	
	vec3 lightDirection = normalize(vec3(1.0, 1.0, -2.0));
	
	for (int i = 0; i < 164; i++) {
		distance = sceneDist(rayPosition);
		currentRayLength += distance;
		rayPosition = cameraPosition + ray * currentRayLength;
		
		if (abs(distance) < EPS) {
			hit = true;
			break;
		}
	}
	
	vec3 color;
	
	if (hit) {
		vec3 normal = getNormal(rayPosition);
		float diff = clamp(dot(lightDirection, normal), 0.1, 1.0);
		color = vec3(0, 1.0, map(sin(time), -1.0, 1.0, 1.0, 8.0)) * diff ;
		
	} else {
		color = vec3(0.12);
	}
	
	gl_FragColor = vec4(color + 0.05 * currentRayLength, 1.0);
}`;

    private fs = require('fs');
    private glslFormatConverter: GLSLFormatConverter = new GLSLFormatConverter();
    private shaderController: ShaderController = new ShaderController();

    /**
     * Observe art changed on firebase real time database.
     */
    public observeArt() {
        let userId = 'nvOag2sj8CQvARL1koIdLbyjOGz1';
        let self = this;

        firebase.database().ref('users/' + userId)
            .on('child_changed', function(snapshot) {
                let artId = snapshot.val();
                self.fetchArt(artId);
            });
    }

    public start() {
        const server: http.Server = http.createServer(
            (request: http.IncomingMessage, response: http.ServerResponse) => {
                if (request.url == '/favicon.ico') {
                    return;
                }
                this.requestHandler(request, response);
            }
        );
        server.listen('5000');
    }

    private fetchArt(artId: string) {
        let option = {
            method: 'GET'
        };

        let url = `${urlProvider.endpoint}/v1/artcode/${artId}`;
        console.log(url);
        fetch(`${urlProvider.endpoint}/v1/artcode/${artId}`, option)
            .then(handleErrors)
            .then(response => response.json())
            .then((artCodeEntity: ArtCodeEntity) => {
                this.changeShader(artCodeEntity)
            })
            .catch(error => console.error(error));
    }

    private requestHandler(request: http.IncomingMessage, response: http.ServerResponse): void {
        response.end('Displaying shader art...');

        let fileName = 'glsl/sample.frag';
        let formattedShader = this.glslFormatConverter.toGLSLViewerFormat(this.FRAGMENT_SHADER_SAMPLE);

        this.fs.writeFile(fileName, formattedShader, (err: any) => {
            if (err) {
                throw err;
            } else {
                this.shaderController.openShader(fileName);
            }
        });
    }

    private changeShader(artCodeEntity: ArtCodeEntity) {
        let fileName = 'glsl/sample.frag';
        let fragmentShader = artCodeEntity.codes[CodeType.FRAGMENT_SHADER - 1].text;
        let formattedShader = this.glslFormatConverter.toGLSLViewerFormat(fragmentShader);

        console.log(formattedShader);

        this.fs.writeFile(fileName, formattedShader, (err: any) => {
            if (err) {
                throw err;
            } else {
                this.shaderController.openShader(fileName);
            }
        });
    }
}
