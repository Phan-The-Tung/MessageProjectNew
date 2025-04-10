const md5 = require('md5');

const User = require("../model/user.model");

// [GET] /user/login
module.exports.login = (req, res) => {
    res.render("pages/user/login.pug", {
        pageTitle: "Đăng nhập"
    });
};

// [POST] //user/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email, deleted: false });

  if (!user) {
    req.flash("error", `Email ${email} không tồn tại !`);
    res.redirect(`back`);
    return;
  }

  if (md5(password) != user.password) {
    req.flash("error", `Sai mật khẩu, vui lòng thử lại !`);
    res.redirect(`back`);
    return;
  }

  if (user.status == "inactive") {
    req.flash("error", `Tài khoản của bạn đã bị khóa !`);
    res.redirect(`back`);
    return;
  }

  res.cookie("tokenUser", user.tokenUser);

  // Cập nhật trạng thái online khi đăng nhập thành công của user
  await User.updateOne({ _id: user.id }, { statusOnline: "online" });

  _io.once("connection", (socket) => {
    socket.broadcast.emit("SERVER_RETURN_USER_ONLINE", user.id);
  });

  // Khi đăng nhập thành công lưu user_id vào collection carts
//   await Cart.updateOne({ _id: req.cookies.cartId }, { user_id: user.id });

  res.redirect(`/`);
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