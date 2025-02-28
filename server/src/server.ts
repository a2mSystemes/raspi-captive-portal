import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import http from 'http';
import https from 'https';
import fs from 'fs';
import { pong } from './pong';


////////////////////////////// Setup ///////////////////////////////////////////

const HOST_NAME = 'coope-birthday.local';
const FRONTEND_FOLDER = path.join(__dirname, '../', '../' ,'tele-faune', 'dist', 'tele-faune', 'browser');
const priv_key = fs.readFileSync('ssl_cert/key.pem', 'utf8')
const cert = fs.readFileSync('ssl_cert/cert.pem', 'utf8')
const credentials = {key: priv_key, cert: cert}



const app = express();

// Redirect every request to our application
// https://raspberrypi.stackexchange.com/a/100118
// [You need a self-signed certificate if you really want 
// an https connection. In my experience, this is just a pain to do
// and probably overkill for a project where you have your own WiFi network
// without Internet access anyway.]
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("connection request protocol : " + (req.hostname != HOST_NAME && req.protocol !== 'https'));
    if (req.hostname != HOST_NAME ) {
        console.log(`redirecting....`)
        return res.redirect(`https://${HOST_NAME}`);
    }
    else if(req.protocol !== 'https'){
        return res.redirect(`https://${HOST_NAME}`);
    }
    next();
});

// Call this AFTER app.use where we do the redirects
app.use(express.static(FRONTEND_FOLDER));


/////////////////////////////// Endpoints //////////////////////////////////////

// Serve frontend
app.get('/', (req, res, next) => {
    console.log("serving");
    res.sendFile(path.join(FRONTEND_FOLDER, 'index.csr.html'));
});



const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);


///////////////////////////// Server listening /////////////////////////////////

// Listen for requests
// If you change the port here, you have to adjust the ip tables as well
// see file: access-point/setup-access-point.sh
const http_PORT = 3000;
const https_PORT = 3443;

httpServer.listen(http_PORT, () => {
    console.log(`Node version: ${process.version}`);
    console.log(`⚡ Raspberry Pi Server listening on port ${http_PORT}`);
});
httpsServer.listen(https_PORT, () => {
    console.log(`Node version: ${process.version}`);
    console.log(`⚡ Raspberry Pi Server listening on port ${https_PORT}`);
});
// import express, { NextFunction, Request, Response } from 'express';
// import path from 'path';
// import { pong } from './pong';


// ////////////////////////////// Setup ///////////////////////////////////////////

// const HOST_NAME = 'coope-birthday.local';
// const FRONTEND_FOLDER = path.join(__dirname, '../', 'public');

// const app = express();

// // Redirect every request to our application
// // https://raspberrypi.stackexchange.com/a/100118
// // [You need a self-signed certificate if you really want 
// // an https connection. In my experience, this is just a pain to do
// // and probably overkill for a project where you have your own WiFi network
// // without Internet access anyway.]
// app.use((req: Request, res: Response, next: NextFunction) => {
//     // console.log("connection request : " + req );
//     if (req.hostname != HOST_NAME) {
//         console.log(`redirecting to ${HOST_NAME}`)
//         return res.redirect(`http://${HOST_NAME}`);
//     }
//     next();
// });

// // Call this AFTER app.use where we do the redirects
// app.use(express.static(FRONTEND_FOLDER));


// /////////////////////////////// Endpoints //////////////////////////////////////

// // Serve frontend
// app.get('/', (req, res, next) => {
//     res.sendFile(path.join(FRONTEND_FOLDER, 'index.html'));
// });

// app.get('/api/ping', pong);


// ///////////////////////////// Server listening /////////////////////////////////

// // Listen for requests
// // If you change the port here, you have to adjust the ip tables as well
// // see file: access-point/setup-access-point.sh
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Node version: ${process.version}`);
//     console.log(`⚡ Raspberry Pi Server listening on port ${PORT}`);
// });
