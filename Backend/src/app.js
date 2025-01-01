const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const useragent = require('express-useragent');
const path = require('path');
const app = express();

// for cross origin resource sharing
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(useragent.express());    // use the useragent middleware to parse useragent header
app.use(express.json()); // tell express to use json as the body parser
app.use(cookieParser()); // tell express to use cookie parser
app.set('trust proxy', true);                                                                          // Enable "trust proxy" to get the client's IP address through proxy headers [setting this makes the load balancer to forward the client's IP address in the X-Forwarded-For header instead of loopback address]
app.use(express.static(path.join(__dirname,"..", 'build')));                                           // tell express to use the build folder as the static folder

app.use(bodyParser.urlencoded({ extended: true })); // tell express to use urlencoded as the body parser

module.exports = { app };