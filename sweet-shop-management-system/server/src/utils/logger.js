const fs = require('fs');

const logInfo = (message) => {
    const logMessage = `[INFO] ${new Date().toISOString()}: ${message}\n`;
    fs.appendFileSync('application.log', logMessage);
};

const logError = (message) => {
    const logMessage = `[ERROR] ${new Date().toISOString()}: ${message}\n`;
    fs.appendFileSync('application.log', logMessage);
};

const logWarning = (message) => {
    const logMessage = `[WARNING] ${new Date().toISOString()}: ${message}\n`;
    fs.appendFileSync('application.log', logMessage);
};

module.exports = {
    logInfo,
    logError,
    logWarning,
};