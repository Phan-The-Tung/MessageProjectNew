const express = require('express');
const flash = require('express-flash');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require('body-parser');
const methodOverride = require("method-override");
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const port = 3000;

app.use(methodOverride("_method"));

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

// SocketIO
const server = http.createServer(app);
const io = new Server(server);
global._io = io;
// End SocketIO

// flash
app.use(cookieParser("ANHQUANCODER"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End flash

const database = require("./config/database.js");

const route = require("./route/index.route");

// Static files
app.use(express.static('public'));

// Template engine
app.set('views', './views');
app.set('view engine', 'pug');
// End Template engine

// connect database
database.connect();

route(app);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})