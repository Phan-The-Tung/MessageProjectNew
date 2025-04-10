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