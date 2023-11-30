# WhatsApp Chat Assistant for privateGPT

WhatsApp chat assistant that provides completions using privateGPT. Allows audio messages using the Deepgram API.

## Prerequisites

To run this application, ensure you have the following:

- Node.js installed.
- A valid WhatsApp account.
- Deepgram API key (if using the transcription feature).

## Setup

1. Clone this repository.
2. Install dependencies by running `npm install`.
3. Create a `.env` file based on the provided `.env.example` and set the necessary environment variables.
4. Run the application using `npm start`.

## Usage

Once the application is running, follow these steps:

1. Scan the QR code displayed in the terminal using your WhatsApp mobile app to authenticate.
2. Once authenticated, the application will start listening for incoming messages.
3. Messages received from authorized users will be processed, and completions will be provided.

## Configuration

- **PORT:** Set the application port.
- **ALLOWED_USERS:** Comma separated list of authorized users' phone numbers (51999999999@c.us).
- **DEEPGRAM_API_KEY:** Add your Deepgram API key to enable transcription of audio messages.

## File Structure

- `index.js`: Main entry point of the application.
- `page.js`: Contains functions to serve the HTML page.
- `client.js`: Initializes the WhatsApp client and handles message processing.
- `dpgm.js`: Handles audio transcription using the Deepgram SDK.
- `pgpt.js`: Provides functions to generate completions for given prompts.

## License

This project is licensed under the MIT License.

## Acknowledgments

This application utilizes the [privateGPT](https://github.com/imartinez/privateGPT), refer to their documentation for
more information.
