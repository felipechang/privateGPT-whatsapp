const {join} = require("path");
const {readFile} = require("fs");
const {getPagePart} = require("./store");

/**
 * Serves the page content by reading an HTML file, replacing placeholders,
 * and sending the modified content as a response.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
const servePageContent = (req, res) => {
    const indexPath = join(__dirname, 'public', 'index.html');

    // Read the HTML file
    readFile(indexPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading HTML file');
        }

        let page = data.toString();

        // Replace placeholders in the HTML content
        page = page.replace('${url}', process.env.PRIVATE_GPT_URL);
        page = page.replace('${port}', process.env.PORT);
        page = page.replace('${part}', getPagePart());

        // Set the response Content-Type and send the modified page
        res.set('Content-Type', 'text/html');
        res.send(page);
    });
};

module.exports = {
    servePageContent
}