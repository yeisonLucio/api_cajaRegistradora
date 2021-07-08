const express = require('express');

const app = express();

app.use("/product", require('./controllers/product/Routes'));

module.exports = app;