// [GET] /
module.exports.login = (req, res) => {
    res.render("pages/user/login.pug", {
        pageTitle: "Đăng nhập"
    });
};