const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const sensitive = require('../sensitive');

const User = require('../models/user');

exports.getLogin = async ({
    email,
    password
}) => {
    let user;
    try {
        user = await User.findOne({
            email: email
        });
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            error.success = false;
            return error;
        }
    } catch (err) {
        err.message = 'Server Error';
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.success = false;
        return err;
    }
    let isEqual = false;
    try {
        isEqual = await bcryptjs.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            error.success = false;
            return error;
        }
    } catch (err) {
        err.message = 'Server Error';
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.success = false;
        return err;
    }
    let token;
    try {
        token = jsonwebtoken.sign({
            email: user.email,
            userId: user._id.toString()
        }, sensitive.jwt.secret, {
            expiresIn: '1h'
        });
    } catch (err) {
        err.message = 'Server Error';
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.success = false;
        return err;
    }
    return {
        token: token,
        success: true
    }
}

exports.create = async ({
    email,
    name,
    password
}) => {
    let user;
    try {
        user = await User.findOne({
            email: email
        });
        if (user) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            error.success = false;
            return error;
        }
    } catch (err) {
        err.message = 'Server Error';
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.success = false;
        return err;
    }
    let hashedPassword;
    try {
        hashedPassword = await bcryptjs.hash(password, sensitive.bcryptjs.saltRounds);
    } catch (err) {
        err.message = 'Server Error';
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.success = false;
        return err;
    }
    const newUser = new User({
        email: email,
        name: name,
        password: hashedPassword
    });
    try {
        await newUser.save();
    } catch (err) {
        err.message = 'Server Error';
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.success = false;
        return err;
    }
    return {
        success: true
    }
};

exports.getUser = async ({
    email
}) => {
    let user;
    try {
        user = await User.findOne({
            email: email
        }).populate('urls');
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            error.success = false;
            return error;
        }
    } catch (err) {
        err.message = 'Server Error';
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.success = false;
        return err;
    }
    return {
        success: true,
        user: {
            email: user.email,
            name: user.name,
            urls: user.urls,
            verificationStatus: user.verificationStatus
        }
    }
};

exports.deleteUser = async ({
    email
}) => {
    let user;
    try {
        user = await User.findOne({
            email: email
        });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            error.success = false;
            return error;
        }
    } catch (err) {
        err.message = 'Server Error';
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.success = false;
        return err;
    }
    try {
        await user.deleteOne();
    } catch (err) {
        err.message = 'Server Error';
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.success = false;
        return err;
    }
    return {
        success: true
    }
};