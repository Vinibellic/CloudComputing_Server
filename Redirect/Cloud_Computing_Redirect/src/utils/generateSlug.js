const crypto = require('crypto');

function generateSlug() {
    return crypto.randomBytes(4).toString('hex');
}

module.exports = { generateSlug };
