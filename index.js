const express = require('express');
const flash = require('express-flash');
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
const port = 3000;

// flash
app.use(cookieParser("ANHQUANCODER"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End flash

const route = require("./route/index.route");

// Static files
app.use(express.static('public'));

// Template engine
app.set('views', './views');
app.set('view engine', 'pug');
// End Template engine

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})