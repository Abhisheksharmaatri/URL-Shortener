const express = require('express');


const auth = require('../middleware/auth');

//Controllers
const userController = require('../controllers/user');

//Routes

const router = express.Router();

router.post('/login', async (req, res, next) => {
    const result = await userController.getLogin({
        email: req.body.email,
        password: req.body.password
    });
    if (result.success === false) {
        return next(result);
    }

    res.status(200).json({
        success: result.success,
        message: 'User logged in successfully.',
        token: result.token
    });
});

router.post('/signup', async (req, res, next) => {
    const result = await userController.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    });
    if (result.success === false) {
        return next(result);
    }

    res.status(200).json({
        success: result.success,
        message: 'User signed up successfully.',
        token: result.token
    });
});

router.delete('/delete', auth, async (req, res, next) => {
    const result = await userController.deleteUser({
        email: req.user.email
    });
    if (result.success === false) {
        return next(result);
    }

    res.status(200).json({
        success: result.success,
        message: 'User deleted successfully.'
    });
});

router.get('/get', auth, async (req, res, next) => {
    const result = await userController.getUser({
        email: req.user.email
    });
    if (result.success === false) {
        return next(result);
    }

    res.status(200).json({
        success: result.success,
        message: 'User fetched successfully.',
        user: result.user
    });
});

module.exports = router;