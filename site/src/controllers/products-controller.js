const { Product } = require("../database/models");

module.exports = {
    async detail(req, res) {
        res.render("products/detail", {
            product: await Product.findByPk(req.params.id),
        });
    },
};
