import * as http from 'http';
import { ShaderController } from './shaderController';

export class Server {

    private shaderController: ShaderController = new ShaderController();

    public start() {
        const server: http.Server = http.createServer(
            (request: http.IncomingMessage, response: http.ServerResponse) => {
                this.requestHandler(request, response);
            }
        );
        server.listen('5000');
    }

    private requestHandler(request: http.IncomingMessage, response: http.ServerResponse): void {
        response.end('Displaying shader art...');
        this.shaderController.openShader('glsl/sample.frag');
    }
}
