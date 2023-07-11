const express = require('express');

const router = express.Router();

const urlController = require('../controllers/url');

router.post('/create', async (req, res, next) => {
    const longUrl = req.body.longUrl;
    const result = await urlController.createUrl({
        longUrl
    });
    if (result.statusCode === 500) {
        return next(result);
    }
    res.status(200).json({
        message: 'Url created successfully',
        url: result
    });
});

module.exports = router;