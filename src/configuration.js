const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    port: process.env.PORT,
    jwtKey: process.env.JWT_KEY,
    hashCode: process.env.HASH_COST,
    url: process.env.URL,
};
