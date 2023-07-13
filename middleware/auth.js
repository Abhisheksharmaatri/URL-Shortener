const jwt = require('jsonwebtoken');

const sensitive = require('../sensitive');

const User = require('../models/user');

module.exports = async (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];
    if (!token) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        error.success = false;
        return next(error);
    }
    let decodedToken;
    try {
        decodedToken = await jwt.verify(token, sensitive.jwt.secret);
    } catch (err) {
        err.statusCode = 500;
        err.success = false;
        return next(err);
    }
    if (!decodedToken || !decodedToken.email || !decodedToken.userId) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        error.success = false;
        return next(error);
    }
    req.user = {
        email: decodedToken.email,
        userId: decodedToken.userId
    }
    next();
};