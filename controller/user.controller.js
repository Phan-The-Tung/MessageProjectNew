const md5 = require('md5');

const User = require("../model/user.model");

// [GET] /
module.exports.login = (req, res) => {
    res.render("pages/user/login.pug", {
        pageTitle: "Đăng nhập"
    });
};

// [POST] /
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

  res.redirect(`/chat`);
};

// [GET] /register
module.exports.register = (req, res) => {
    res.render("pages/user/register.pug", {
        pageTitle: "Đăng ký"
    });
};

// [POST] /register
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

// [GET] /password/forgot
module.exports.forgot = async (req, res) => {
  res.render(`pages/user/forgot.pug`, {
    pageTitle: "Lấy lại mật khẩu",
  });
}

// [POST] /password/forgotPost
module.exports.forgot = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email, deleted: false });

  if (!user) {
    req.flash("error", `Email ${email} không tồn tại !`);
    res.redirect(`back`);
    return;
  }

  // Việc 1: Tạo mã OTP và lưu OTP, email và collection forgot-password
  const otp = generateHelper.generateRandomNumber(8);

  const objectForgot = {
    email: email,
    otp: otp,
    expireAt: Date.now(),
  };

  const forgotPassword = new ForgotPassword(objectForgot);
  await forgotPassword.save();

  // Việc 2: Gửi mã otp qua email của user
  const subject = "Mã OTP để xác minh lấy lại mật khẩu";
  const html = `Mã OTP xác minh lấy lại mật khẩu là: <b>${otp}</b>. Thời hạn sử dụng là 3 phút. Lưu ý, không được để lộ mã OTP`;
  sendMailerHelper.sendMail(email, subject, html);

  res.redirect(`/user/password/otp?email=${email}`);
}