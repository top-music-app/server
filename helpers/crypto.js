require('dotenv').config();
const crypto = require('crypto');

module.exports = {
    encrypt: (password) => {
        return crypto.createHmac(process.env.CRYPTO_OPTION, process.env.CRYPTO_KEY).update(password).digest('hex');
    }
};
