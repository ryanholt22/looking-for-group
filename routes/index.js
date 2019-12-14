const path = require('path');
const router = require('express').Router();
const apiRoutes = require("./api");
const userInViews = require('../lib/middleware/userInViews');
const authRouter = require('./authentication/auth');

router.use(userInViews());
router.use("/api", apiRoutes);
router.use('/', authRouter);

router.use((req, res) => res.sendFile(path.join(__dirname, "../client/build/index.html")));

module.exports = router;
