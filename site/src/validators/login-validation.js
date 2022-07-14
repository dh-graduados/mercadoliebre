const { body } = require("express-validator");

const isDevServer = require("../utils/is-dev-server")();

module.exports = [
    body("email")
        .normalizeEmail({
            gmail_remove_subaddress: isDevServer,
        })
        .isEmail(),
    body("password").notEmpty(),
];
