const { Order } = require("../database/models");
const { generatePreference } = require("../services/mercadopago");
const OrderStatus = require("../utils/order-status");
const PaymentMethod = require("../utils/payment-method");

module.exports = {
    async viewOrders(req, res) {
        const orders = await Order.findAll({
            where: {
                userId: req.currentUser.id,
            },
            include: ["products"],
        });
        res.render("orders/list", {
            orders: orders,
        });
    },

    async startMercadopagoPayment(req, res) {
        const order = await Order.findByPk(req.params.id, {
            include: ["products", "user"],
        });
        const preference = await generatePreference(req.get("host"), order);
        order.status = OrderStatus.PAYMENT_PENDING;
        order.paymentMethod = PaymentMethod.MERCADOPAGO;
        order.preferenceId = preference.id;
        await order.save();

        res.redirect(preference.init_point);
    },
};
