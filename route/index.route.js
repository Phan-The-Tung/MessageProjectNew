const chatRoute = require("./chat.route");
const userRoute = require("./user.route");

module.exports = (app) => {
    app.use('/', chatRoute);

    app.use('/user', userRoute);
}