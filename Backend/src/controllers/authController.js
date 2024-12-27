const { google } = require('googleapis');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { captureAccount } = require("./captureAccount.js");

const GoogleLogin = async (req, res) => {
    try {

        const code = req.query.code; // get the code from the frontend
        const OAuth2Client = new google.auth.OAuth2(process.env.OAUTH_CLIENT_ID, process.env.OAUTH_CLIENT_SECRET, 'postmessage'); // create a new OAuth2Client
        const googleRes = await OAuth2Client.getToken(code); // get the token from the code
        OAuth2Client.setCredentials(googleRes.tokens);       // set the credentials
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}` // use the token to get the user info
        );
        //create an object with the user info that contains the email, name, and picture

        const { email, name, picture } = userRes.data; // get the email, name, and picture from the user info

        const token = jwt.sign({ email, name, picture }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_TIMEOUT }); // create a token with the user info

        await captureAccount(email, name, picture); // call the captureAccount function to add the user to the database

        res.status(200).json({
            message: "Google Login Successful",
            token: token,
            email: email,
            name: name,
            picture: picture
        });

    } catch (error) {
        // console.log(error);
        res.status(500).json({
            message: "Google Login Failed",
            error: error
        });
    }
}

module.exports = { GoogleLogin };