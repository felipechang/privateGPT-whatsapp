/**
 * Retrieves completion for a given prompt.
 * @param {string} prompt - The prompt to generate completion.
 * @returns {Promise<string>} A Promise resolving to the generated completion.
 */
const getCompletion = async (prompt) => {
    try {
        const response = await fetch('http://localhost:8001/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({prompt, 'use_context': true})
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