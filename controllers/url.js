//Packages
const {
    v4: uuidv4
} = require('uuid');

//Model
const URL = require('../models/url');
const User = require('../models/user');
const sensitive = require('../sensitive');

const UserContoller = require('./user');

exports.createUrl = async ({
    longUrl,
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
        user.urls.forEach(url => {
            if (url.longUrl === longUrl) {
                const error = new Error('Url already exists');
                error.statusCode = 400;
                error.success = false;
                return error;
            }
        });
    } catch (err) {
        err.message = 'Server Error';
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.success = false;
        return err;
    }
    const urlCode = uuidv4().split('-')[0].toString();
    const shortUrl = `${sensitive.service.url}${urlCode}`;
    // const expirationDate = new Date(Date.now() + 5000) // + 1000 * 60 * 60 * 24 * 7);

    const url = new URL({
        longUrl: longUrl,
        shortUrl: shortUrl,
        urlCode: urlCode,
        expirationDate: sensitive.url.expirationDate,
        userId: user._id
    });
    try {
        await url.save();
        const result = await UserContoller.urlUpdate({
            email: email
        });
        if (!result.success) {
            return next(result);
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
        user.urls.push(url);
        await user.save();
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

exports.getUrl = async ({
    urlCode
}) => {
    let url;
    try {
        url = await URL.findOne({
            urlCode: urlCode
        });
        if (!url) {
            const error = new Error('Url not found');
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
        url: {
            longUrl: url.longUrl,
            shortUrl: url.shortUrl,
            expirationDate: url.expirationDate
        }
    }
}

exports.deleteUrl = async ({
    urlId
}) => {
    let user;
    try {
        user = await User.findById(userId).populate('urls');
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            error.success = false;
            return error;
        }
        let urlExist = false;
        user.urls.forEach(url => {
            if (url.longUrl === longUrl) {
                urlExist = true;
            }
        });
        if (!urlExist) {
            const error = new Error('Url not found');
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
    let url;
    try {
        url = await URL.findByIdAndDelete(urlId);
        if (!url) {
            const error = new Error('Url not found');
            error.statusCode = 404;
            error.success = false;
            return error;
        }
        user.urls = user.urls.filter(url => url._id.toString() !== urlId.toString());
        await user.save();
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