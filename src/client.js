const qrcode = require('qrcode-terminal');
const {getCompletion} = require('./pgpt');
const {getTranscription} = require('./dpgm');
const {Client, LocalAuth} = require("whatsapp-web.js");
const {config} = require('dotenv');

// Load environment variables from .env file
config();

// Check if an allowed user list is provided, throw error if not
if (!process.env.ALLOWED_USERS) throw new Error('User list not provided');
const userList = process.env.ALLOWED_USERS.split(',');

// Initialize WhatsApp client
const client = new Client({authStrategy: new LocalAuth()});

/**
 * Initializes the WhatsApp client and sets up event listeners.
 * @param {WebSocket} ws - The WebSocket connection used to send messages.
 */
const initializeClient = async (ws) => {

    // Event: Triggered when QR code is received, displays QR code in terminal
    client.on('qr', (qr) => qrcode.generate(qr, {small: true}, (img) => {
        console.log('Sending QR code...');
        ws.send(`<textarea style="width: 420px;height: 450px;">${img}</textarea>`);
    }));

    // Event: Triggered when WhatsApp client is ready
    client.on('ready', async () => {
        console.log('Client is ready to receive messages');
        ws.send(`<h1>Client is ready to receive messages</h1>`);
    });

    // Event: Triggered when a new message is received
    client.on('message_create', async (msg) => {

        // Ignore system status messages
        if (msg.from === 'status@broadcast') return;

        // Set self message key
        const selfKey = msg.fromMe ? '#' : '';

        // Ignore messages starting with '#'
        if (msg.fromMe && msg.body[0] === selfKey) return;

        // Check if the sender is in the user list
        if (userList.indexOf(msg.from) === -1) return await msg.reply(selfKey + 'Invalid user');

        // Retrieve transcription if available
        if (msg.hasMedia) {
            if (!process.env.DEEPGRAM_API_KEY) return await msg.reply(selfKey + 'Deepgram key not set');
            const media = await msg.downloadMedia();
            const transcription = await getTranscription(media);
            if (transcription) msg.body = transcription;
        }

        // Retrieve completion for given message
        const completion = await getCompletion(msg.body);

        // Reply to user
        await msg.reply(selfKey + completion);
    });

    // Initialize Whatsapp client
    await client.initialize();
}

module.exports = {
    initializeClient
}