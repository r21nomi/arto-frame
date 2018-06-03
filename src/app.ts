import { Server } from './server';

class Main {
    constructor() {
        const server = new Server();
        server.start();
    }
}

const  main = new Main();
