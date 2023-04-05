const { Op } = require("sequelize");
const { Product } = require("../database/models");

module.exports = {
    async detail(req, res) {
        res.render("products/detail", {
            product: await Product.findByPk(req.params.id),
        });
    },
    async search(req, res) {
        const search = req.query.q;
        //search products by name
        const products = await Product.findAll({
            where: {
                name: {
                    [Op.like]: `%${search}%`,
                },
            },
        });

        res.render("products/search-results", { products, search });
    },
};
