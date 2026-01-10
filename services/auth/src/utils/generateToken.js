const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const RefreshToken = require('../models/RefreshToken');

const generateTokens = async (user) => {
    const accessToken = jwt.sign({
        userId: user._id
    }, process.env.JWT_SECRET, { expiresIn: '30m' });

    const refreshToken = crypto.randomBytes(40).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 2); // expires after 2 days

    await RefreshToken.create({
        token: refreshToken,
        userId: user._id,
        expiresAt
    });
    return { accessToken, refreshToken };
}

module.exports = generateTokens;