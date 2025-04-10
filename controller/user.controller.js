const md5 = require('md5');

const User = require("../model/user.model");

// [GET] /user/login
module.exports.login = (req, res) => {
    res.render("pages/user/login.pug", {
        pageTitle: "Đăng nhập"
    });
};

// [POST] //user/login
module.exports.loginPost = (req, res) => {
    // const email = req.body.email;
    // const password = req.body.password;

    console.log(req.body)
    res.send("Oke");
};

// [GET] /user/register
module.exports.register = (req, res) => {
    res.render("pages/user/register.pug", {
        pageTitle: "Đăng ký"
    });
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
    const existEmail = await User.findOne({
        email: req.body.email,
        deleted: false,
    });

    if (existEmail) {
        req.flash("error", `Email ${req.body.email} đã tồn tại !`);
        res.redirect("back");
        return;
    }

    req.body.password = md5(req.body.password);

    delete req.body.rePassword;

    const user = new User(req.body);
    await user.save();

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/");
};