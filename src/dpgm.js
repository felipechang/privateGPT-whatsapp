const {Deepgram} = require('@deepgram/sdk');
const {config} = require('dotenv');

// Load environment variables from .env file
config();

// Initialize Deepgram client with API key (if available)
const dg = new Deepgram(process.env.DEEPGRAM_API_KEY || 'DUMMY');

/**
 * @typedef {Object} Media
 * @property {string} mimetype - The MIME type of the media.
 * @property {string} data - The base64-encoded data of the media.
 */

/**
 * @typedef {Object} TranscriptionResult
 * @property {string} result - The transcription result.
 */

/**
 * Gets the transcription of audio media using Deepgram SDK.
 * @param {Media} media - The audio media object containing mimetype and base64 data.
 * @returns {Promise<string>} - The transcription of the audio media.
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
}

module.exports = {
    getTranscription
}