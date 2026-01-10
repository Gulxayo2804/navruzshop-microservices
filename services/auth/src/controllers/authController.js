const logger = require('../utils/logger');
const { validateRegistration } = require('../utils/validation');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateTokens = require('../utils/generateToken');

exports.signUp = async (req, res) => {
    logger.info('Registration user..');
    try {
        const { error } = validateRegistration(req.body);
        if (error) {
            logger.warn('Validation error', error.details[0].message);
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            })
        }
        const { email, password, name } = req.body;
        const user = await User.findOne(email);
        if (user) {
            logger.warn('User already exit');
            return res.status(400).json({
                success: false,
                message: 'User already exit'
            })
        }
        const hashPassword = bcrypt.hash(password, 10);
        user = new User({ name, email, hashPassword });
        await user.save();
        logger.warn('User created: ', user._id)
        const { accessToken, refreshToken } = await generateTokens(user);
        res.status(201).json({
            success: true,
            message: "User created",
            accessToken,
            refreshToken
        })
    } catch (error) {
        logger.error('Registirion error accured');
        res.status(500).json({
            message: 'Inernal error'
        })

    }
}