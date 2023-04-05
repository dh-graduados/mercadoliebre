const { Product } = require("../database/models");

module.exports = {
    async detail(req, res) {
        res.render("products/detail", {
            product: await Product.findByPk(req.params.id),
        });
    },
    async search(req, res) {
        //search products by name
        const products = await Product.findAll({
            where: {
                name: {
                    [Op.like]: `%${req.query.q}%`,
                },
            },
        });

        res.render("products/search-result", { products });
    },
};
