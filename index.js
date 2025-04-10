const express = require('express')
const app = express()
const port = 3000

const route = require("./route/index.route");

// Static files
app.use(express.static('public'))

// Template engine
app.set('views', './views');
app.set('view engine', 'pug');
// End Template engine

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})