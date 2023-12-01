const {config} = require('dotenv');

// Load environment variables from .env file
config();

/**
 * Retrieves completion for a given prompt.
 * @param {string} prompt - The prompt to generate completion.
 * @returns {Promise<string>} A Promise resolving to the generated completion.
 */
const getCompletion = async (prompt) => {
    try {
        const body = {prompt, 'use_context': true, 'include_sources': true};
        if (process.env.PRIVATE_GPT_SYSTEM) body["system_prompt"] = process.env.PRIVATE_GPT_SYSTEM;
        const response = await fetch(`${process.env.PRIVATE_GPT_URL}/v1/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) return 'Network response was not ok';
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getCompletion
};