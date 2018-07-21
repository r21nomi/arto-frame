#!/usr/bin/env node

import { Server } from '../src/server';
import { firebaseConfig } from '../src/firebaseConfig';
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
