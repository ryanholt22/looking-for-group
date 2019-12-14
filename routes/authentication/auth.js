const express = require('express');
const router = express.Router();
const passport = require('passport');
const dotenv = require('dotenv');
const util = require('util');
const url = require('url');
const querystring = require('querystring');

dotenv.config();

// Perform login then redirect to callback
router.get('/login', passport.authenticate('auth0', {
    scope: 'openid email profile'
}), (req, res) => res.redirect('/'));

// Perform final stage of authentication 
router.get('/callback', (req, res, next) => {
    passport.authenticate('auth0', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        req.logIn(user, err => {
            if (err) {
                return next(err);
            }
            const returnTo = req.session.returnTo;
            delete req.session.returnTo;
            res.redirect(returnTo || '/user')
        });
    })(req, res, next);
});

// Perform logout and redirect home
router.get('/logout', (req, res) => {
    req.logout();

    let returnTo = `${req.protocol}://${req.hostname}`;
    let port = req.connection.localPort;
    if (port !== undefined && port !== 80 && port !== 443) {
        returnTo += `:${port}`;
    }
    let logoutURL = new url.URL(
        util.format('https://%s/v2/logout', process.env.AUTH0_DOMAIN)
    );
    let searchString = querystring.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        returnTo: returnTo
    });
    logoutURL.search = searchString;
    res.redirect(logoutURL);
});

module.exports = router;
