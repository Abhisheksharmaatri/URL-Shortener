//Packages
const {
    v4: uuidv4
} = require('uuid');

//Model
const URL = require('../models/url');

exports.createUrl = async ({
    longUrl
}) => {
    const existingUrl = await URL.findOne({
        longUrl: longUrl
    });
    if (existingUrl) {
        const error = new Error('Url already exists');
        error.statusCode = 400;
        return error;
    }
    let url;
    try {
        const urlCode = uuidv4().substring(0, 6);

        const newUrl = new URL({
            longUrl: longUrl,
            shortUrl: `{process.env.BASE_URL}/${urlCode}`,
            urlCode: urlCode,
        });
        url = await newUrl.save();
    } catch (err) {
        console.log(err);
        err.message = 'Error in creating url';
        err.statusCode = 500;
        return err;
    };
    return url;
};