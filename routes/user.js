const express = require('express');

const userController = require('../controllers/user');

const auth = require('../middleware/auth');

const router = express.Router();

router.post('/create', async (req, res, next) => {
    const result = await userController.createUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    if (result.statusCode === 500 || result.statusCode === 400) {
        return next(result);
    }
    res.status(200).json({
        message: 'User created successfully',
        user: result
    });
}); //Tested

router.post('/delete', auth, async (req, res, next) => {
    const result = await userController.deleteUser({
        email: req.body.email,
        password: req.body.password
    });
    if (result.statusCode === 500 || result.statusCode === 400) {
        return next(result);
    }
    res.status(200).json({
        message: 'User deleted successfully',
        user: result
    });
}); //Tested

router.post('/get-user', auth, async (req, res, next) => {}); //Tested

router.post('/login', async (req, res, next) => {
    const result = await userController.loginUser({
        email: req.email
    });
    if (result.statusCode === 500 || result.statusCode === 400) {
        return next(result);
    }
    res.status(200).json({
        message: 'User logged in successfully',
        token: result.token,
    });
}); //Tested

module.exports = router;