const chatRoute = require("./chat.route");
const userRoute = require("./user.route");
const usersRoute = require("./users.route");

const userMiddleware = require("../middleware/user.middleware");

module.exports = (app) => {
    app.use(userMiddleware.infoUser);

    app.use('/', userRoute);

    app.use('/chat', chatRoute);

    app.use('/users', usersRoute);
}