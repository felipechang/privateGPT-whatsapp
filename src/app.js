const express = require('express');
const http = require('http');
const {Server} = require('ws');
const {config} = require('dotenv');
const {servePageContent} = require("./page");
const {initializeClient} = require("./client");

// Load environment variables from .env file
config();

// Check mandatory values are set
if (!process.env.PORT) throw new Error('Port not provided');
if (!process.env.PRIVATE_GPT_URL) throw new Error('privateGPT url not provided');

// Initialize Express client
const app = express();
const server = http.createServer(app);
const wss = new Server({server});

// Serve html
app.use(servePageContent);

// Initialize client on connection
wss.on('connection', initializeClient);

// Start server and open browser
server.listen(process.env.PORT, async () => {
    console.log(`Server started on http://localhost:${process.env.PORT}`);
    import('open').then((open) => {
        open.default(`http://localhost:${process.env.PORT}`);
    });
});

