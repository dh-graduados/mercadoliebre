const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    if (!req.currentUser) {
        res.redirect(`/login?backUrl=${req.originalUrl}`);
        return;
    }

    next();
};
