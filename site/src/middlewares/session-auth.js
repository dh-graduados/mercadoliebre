const { User } = require("../database/models");

module.exports = async function sessionAuth(req, res, next) {
    if (!req.session.loggedUserId) {
        res.locals.currentUser = null;
        next();
        return;
    }

    const user = await User.findByPk(req.session.loggedUserId);
    if (!user) {
        req.session.loggedUserId = null;
    }

    req.currentUser = user;
    res.locals.currentUser = user;

    next();
};
