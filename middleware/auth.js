const jsonwebtoken = require('jsonwebtoken');

//Model
const User = require('../models/user');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('No authorization header found');
        error.statusCode = 401;
        return next(error);
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken.verify(token, 'secret');
    } catch (err) {
        err.statusCode = 500;
        return next(err);
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        return next(error);
    }
    req.email = decodedToken.email;
    next();
};