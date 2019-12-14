const express = require('express');
const secured = require('../../lib/middleware/secured');
const router = express.Router();



router.get('/user', secured(), (req, res, next) => {
    const{_raw, _json, ...userProfile } = req.user;
    res.render('/matchform', {
        userProfile: JSON.stringify(userProfile, null, 2),
        title: 'Profile Page'
    });
});