//Models
const User = require('../models/user');

//Packages
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Controllers
exports.createUser = async ({
    name,
    email,
    password
}) => {
    const existingUser = await User.findOne({
        email: email
    });
    if (existingUser) {
        console.log('iser: ', {
            ...existingUser
        })
        const error = new Error('User already exists');
        error.statusCode = 400;
        return error;
    }
    try {
        const hashedPW = await bcrypt.hash(password, 12);
        const user = new User({
            name: name,
            email: email,
            password: hashedPW
        });
        await user.save();
        return {
            message: 'User created successfully',
            user: user
        }
    } catch (err) {
        console.log(err);
        err.message = 'Error in creating user';
        err.statusCode = 500;
        return err;
    }
};

exports.loginUser = async ({
    email
}) => {
    let user, isEqual;
    try {
        user = await User.findOne({
            email: email
        });
        if (!user) {
            const error = new Error('User does not exist');
            error.statusCode = 400;
            return error;
        }
    } catch (err) {
        console.log(err);
        err.message = 'Server Error';
        err.statusCode = 500;
        return err;
    }
    const token = jwt.sign({
        email: user.email
    }, 'secret', {
        expiresIn: '1h'
    });
    return {
        message: 'User logged in successfully',
        token: token
    }
};


exports.getUser = async (userId) => {
    let user;
    try {
        user = await User.findById(userId);
        if (!user) {
            const error = new Error('User does not exist');
            error.statusCode = 400;
            return error;
        }
    } catch (err) {
        console.log(err);
        err.message = 'Server Error';
        err.statusCode = 500;
        return err;
    }
    return {
        message: 'User fetched successfully',
        email: user.email,
        name: user.name,
        urls: user.urls
    }
};

exports.deleteUser = async ({
    email
}) => {
    let user;
    try {
        user = await User.findOne({
            email: email
        })
        if (!user) {
            const error = new Error('User does not exist');
            error.statusCode = 400;
            return error;
        }
        await User.deleteOne({
            email: email
        });
    } catch (err) {
        console.log(err);
        err.message = 'Server Error';
        err.statusCode = 500;
        return err;
    }
    return {
        message: 'User deleted successfully'
    }
};