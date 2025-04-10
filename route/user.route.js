const express = require("express");
const router = express.Router();

const controller = require("../controller/user.controller");

const registerMiddleware = require("../middleware/register.middleware");

router.get('/', controller.login);

router.post('/login',registerMiddleware.loginPost , controller.loginPost);

router.get('/register', controller.register);

router.post('/register', registerMiddleware.registerPost , controller.registerPost);

router.get("/password/forgot", controller.forgot);

router.get("/logout", controller.logout);

router.get("/info", controller.info);

router.get("/edit", controller.edit);

router.patch("/edit", controller.editPatch);

module.exports = router;