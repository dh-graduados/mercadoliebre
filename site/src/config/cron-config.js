const cron = require("node-cron");

const { Order } = require("../database/models");
const mercadopago = require("../services/mercadopago");
const orderStatus = require("../utils/order-status");

module.exports = {
    config() {
        //Cada 5 minutos
        cron.schedule("*/5 * * * *", async () => {
            console.log("[cron] Updating Orders...");

            const orders = await Order.findAll({
                where: {
                    status: orderStatus.PAYMENT_PENDING,
                },
            });

            let ordersUpdated = 0;
            for (const order of orders) {
                try {
                    const payment = await mercadopago.findPayment(order.id);
                    if (payment) {
                        order.paymentId = payment.id;
                        order.status = mercadopago.mapOrderStatus(payment.status);
                        await order.save();
                        ordersUpdated++;
                    } else {
                        console.log("[cron] No payment found for: " + order.id);
                    }
                } catch (error) {
                    console.error("Failed updating order: " + order.id, error);
                }
            }
            console.log(`[cron] ${ordersUpdated}/${orders.length} orders updated`);
        });
    },
};
