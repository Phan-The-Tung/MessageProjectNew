const express = require("express");
const router = express.Router();

const controller = require("../controller/user.controller");

const registerMiddleware = require("../middleware/register.middleware");

router.get('/login', controller.login);

router.post('/login',registerMiddleware.loginPost , controller.loginPost);

router.get('/register', controller.register);

router.post('/register', registerMiddleware.registerPost , controller.registerPost);

module.exports = router;