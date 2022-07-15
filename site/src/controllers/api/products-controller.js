const { Product } = require("../../database/models");

module.exports = {
    async listProducts(req, res) {
        const { rows, count } = await Product.findAndCountAll();
        res.send({
            meta: {
                totalCount: count,
            },
            data: rows,
        });
    },
};
