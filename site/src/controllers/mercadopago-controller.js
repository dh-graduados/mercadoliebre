const { Order } = require("../database/models");
const mercadopago = require("../services/mercadopago");

module.exports = {
    async backUrl(req, res) {
        console.log(req.query);

        const status = req.query.status;
        const paymentId = req.query.payment_id;

        const orderId = req.query.external_reference;

        const order = await Order.findByPk(orderId);
        order.paymentId = paymentId;
        order.status = mercadopago.mapOrderStatus(status);

        await order.save();

        res.redirect("/me/orders");
    },
};
