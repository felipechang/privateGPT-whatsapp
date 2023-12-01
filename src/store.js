const {join} = require("path");
const {readFileSync} = require("fs");

/**
 * Holds the partial page content.
 * @type {string}
 */
let pagePart = '';

/**
 * Indicates whether the page part has been initialized.
 * @type {boolean}
 */
let initialized = false;

/**
 * Retrieves the stored page part.
 * @returns {string} The stored page part.
 */
const getPagePart = () => {
    return pagePart;
};

/**
 * Sets the file part to be sent via WebSocket.
 * @param {WebSocket} ws - The WebSocket instance.
 * @param {string} file - The file name.
 * @param {string} msg - The message to replace in the file content.
 * @param {boolean} init - Flag indicating initialization.
 */
const setFilePart = (ws, file, msg, init) => {
    if (init && initialized) return;
    const indexPath = join(__dirname, 'public', file);
    const data = readFileSync(indexPath, 'utf8');
    let page = data.toString();
    if (msg) page = page.replace('${msg}', msg);
    if (init) initialized = init;
    pagePart = page;
    ws.send(page);
};

module.exports = {
    getPagePart,
    setFilePart
};
