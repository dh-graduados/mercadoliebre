const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash("formErrors", errors.mapped());
        req.flash("oldData", req.body);
        res.redirect("back");
        return;
    }

    next();
};
