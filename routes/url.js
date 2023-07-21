const express = require('express');

const auth = require('../middleware/auth');

const router = express.Router();

const urlController = require('../controllers/url');

router.post('/create', auth, async (req, res, next) => {
    const result = await urlController.createUrl({
        longUrl: req.body.longUrl,
        email: req.user.email
    });
    if (!result.success) {
        return next(result);
    }
    return res.status(201).json({
        message: 'Url created successfully',
    })
});

// router.get('/:urlCode', async (req, res, next) => {
//     const result = await urlController.getUrl({
//         urlCode: req.params.urlCode
//     });
//     if (!result.success) {
//         return next(result);
//     }
//     return res.status(200).json({
//         message: 'Url fetched successfully',
//         url: result.url
//     })
// });

router.delete('/delete', auth, async (req, res, next) => {
    const result = await urlController.deleteUrl({
        urlId: req.body.urlId,
        email: req.user.email
    });
    if (!result.success) {
        return next(result);
    }
    return res.status(200).json({
        message: 'Url deleted successfully',
    });
});

router.get('/:urlCode', async (req, res, next) => {
    const result = await urlController.getUrl({
        urlCode: req.params.urlCode
    });
    if (!result.success) {
        return next(result);
    }
    return res.status(200).json({
        message: 'Url fetched successfully',
        url: result.url.longUrl
    });
});

module.exports = router;