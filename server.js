const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes');
const app = express();
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const PORT = process.env.PORT || 3001;

// environment variables
dotenv.config();

const strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL:
            process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/'
    },

    (accessToken, refreshToken, extraParams, profile, done) => {
        // extraParams.id_token has the JSON Web Token
        return done(null, profile);
    }
)
// express-session configuration
const sess = {
    secret: 'LookingForGroupFoo',
    cookie: {},
    resave: false,
    saveUninitialized: true
};

app.use(express.urlencoded({ extended: true }));;
app.use(express.json());


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    sess.cookie.secure = true;
    app.set('trust proxy', 1);
}

// if (app.get('env') === 'production') {

// }

app.use(session(sess));
app.use(routes);

passport.use(strategy);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/lookingforgroup');

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));