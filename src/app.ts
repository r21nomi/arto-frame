import { Server } from './server';
import { firebaseConfig } from './firebaseConfig';
import * as firebase from 'firebase';

class Main {
    constructor() {
        firebase.initializeApp(firebaseConfig);

        const server = new Server();
        server.start();
        server.observeArt();
    }
}

const  main = new Main();
