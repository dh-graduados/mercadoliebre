const { join } = require("path");
const { static } = require("express");
const session = require("express-session");
const flash = require("../middlewares/flash-messages");
const sessionAuth = require("../middlewares/session-auth");
const cartMiddleware = require("../middlewares/cart-middleware");

module.exports = {
    config(app) {
        app.use(
            session({
                secret: process.env.SECRET,
                saveUninitialized: true,
                resave: true,
            })
        );
        app.use(flash);
        app.use(cartMiddleware);
        app.use(sessionAuth);

        app.use(static(join(__dirname, "..", "..", "public")));
    },
};
