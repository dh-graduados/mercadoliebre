const { Product } = require("../database/models");
module.exports = {
    async home(req, res) {
        res.render("home", {
            products: await Product.findAll(),
        });
    },
};
