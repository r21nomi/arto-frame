# arto-frame
Application for frame device like Raspberry Pi.

## Get Started
How to start application on Raspberry Pi.

### setup for firebase
Place `firebaseConfig.ts` under `src` dir.
```typescript
// Fill appropriate values.
export const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};
```

### Preparation for frame device
Install node.js and npm beforehand.  

And the, install [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer).
```
$ sudo apt-get install glslviewer
```

### Build
```
$ npm install
$ npm run build
```

### Start Application
```
$ node src/app
```