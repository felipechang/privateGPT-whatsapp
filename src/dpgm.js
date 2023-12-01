const {config} = require('dotenv');

// Load environment variables from .env file
config();

/**
 * Represents a Deepgram client.
 * @typedef {Object} DeepgramClient
 * @property {Function} transcription - Function to transcribe audio.
 */

const {Deepgram} = require('@deepgram/sdk');

/**
 * Initialize Deepgram client with API key (if available).
 * @type {Deepgram}
 */
const dg = new Deepgram(process.env.DEEPGRAM_API_KEY || 'DUMMY');

/**
 * Get transcription from media.
 * @param {Object} media - Media object containing mimetype and data.
 * @param {string} media.mimetype - Type of media (e.g., audio, video).
 * @param {string} media.data - Base64 encoded media data.
 * @returns {Promise<string>} - A Promise that resolves with the transcription or an empty string.
 */
const getTranscription = async (media) => {
    if (media.mimetype.indexOf('audio') !== -1) {
        const transcription = await dg.transcription.preRecorded({
            mimetype: media.mimetype,
            buffer: Buffer.from(media.data, 'base64'),
        });
        return transcription.results.channels[0].alternatives[0].transcript;
    }
    return '';
};

module.exports = {
    getTranscription,
};
