const jwt = require("jsonwebtoken");
const { signature } = require('../config/config.js');

const generateTokenJWT = (info) => {
    const token = jwt.sign(info, signature);
    return token;
}

const validateTokenJWT = (token) => {
    try {
        const decoded = jwt.verify(token, signature);
        return decoded;
    } catch (error) {
        return false;
    }
}

module.exports = { generateTokenJWT, validateTokenJWT }