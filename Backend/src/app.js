const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

// for cross origin resource sharing
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(express.json()); // tell express to use json as the body parser
app.use(cookieParser()); // tell express to use cookie parser
// app.use(express.static(path.join(__dirname,"..", 'build')));
// app.use(express.static(path.join(__dirname,"..", 'uploads')));
app.use(bodyParser.urlencoded({ extended: true })); // tell express to use urlencoded as the body parser

module.exports = { app };