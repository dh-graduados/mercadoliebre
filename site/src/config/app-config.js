const { join } = require("path");

module.exports = {
    config(app) {
        app.set("view engine", "ejs");
        app.set("views", join(__dirname, "..", "views"));
    },
};
