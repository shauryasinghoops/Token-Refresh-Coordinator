import 'dotenv/config';
import http from 'http';
import app from './app.js';


const port = process.env.PORT || 3000;      // user variable port or if not availble use default 3000 port.


const server = http.createServer(app);


server.listen(port , () => {
    console.log(`server is running on port ${port}`);
})