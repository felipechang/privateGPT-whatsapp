const {join} = require("path");
const {readFile} = require("fs");

/**
 * Serves the content of the index.html file.
 * Replaces '${port}' with the environment variable PORT in the HTML content.
 * @param {IncomingMessage} req - The request object.
 * @param {ServerResponse} res - The response object.
 */
const servePageContent = (req, res) => {
    const indexPath = join(__dirname, 'public', 'index.html');
    readFile(indexPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading HTML file');
        }
        const modifiedData = data.toString().replace('${port}', process.env.PORT);
        res.set('Content-Type', 'text/html');
        res.send(modifiedData);
    });
}

module.exports = {
    servePageContent
}