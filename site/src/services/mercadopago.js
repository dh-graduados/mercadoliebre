const mercadopago = require("mercadopago");
const orderStatus = require("../utils/order-status");
mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
});

module.exports = {
    async generatePreference(host, order) {
        const preference = await mercadopago.preferences.create({
            external_reference: order.id,
            back_urls: {
                success: `${host}/mercadopago/status/${order.id}`,
                failure: `${host}/mercadopago/status/${order.id}`,
                pending: `${host}/mercadopago/status/${order.id}`,
            },
            items: order.products.map((product) => {
                return {
                    title: product.name,
                    unit_price: Number(product.OrderProduct.price),
                    quantity: product.OrderProduct.count,
                };
            }),
        });

        return preference.body;
    },

    async findPayment(orderId) {
        const response = await mercadopago.payment.search({
            qs: {
                sort: "date_created",
                criteria: "desc",
                external_reference: orderId,
            },
        });
        const results = response.body.results;
        if (results.length > 0) {
            return results[0];
        }
        return null;
    },

    mapOrderStatus(status) {
        if (["approved"].includes(status)) {
            return orderStatus.COMPLETED;
        }
        if (["refunded", "charged_back"].includes(status)) {
            return orderStatus.REFUNDED;
        }
        if (["pending"].includes(status)) {
            return orderStatus.PAYMENT_PENDING;
        }
        if (["rejected", "cancelled", "null"].includes(status)) {
            return orderStatus.PAYMENT_FAILED;
        }

        return orderStatus.PAYMENT_FAILED;
    },
};
