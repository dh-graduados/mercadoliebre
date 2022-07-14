const { Order, Product } = require("../database/models");
const { generatePreference } = require("../services/mercadopago");
const orderStatus = require("../utils/order-status");
const paymentMethod = require("../utils/payment-method");

module.exports = {
    viewCart(req, res) {
        const cart = Object.values(req.session.cart);
        const totalPrice = cart.reduce((acc, item) => acc + item.price * item.count, 0).toFixed(2);
        res.render("cart", {
            cart,
            totalPrice,
        });
    },

    async buyCart(req, res) {
        if (!req.currentUser) {
            res.redirect(`/login?backUrl=/me/cart`);
            return;
        }

        const items = Object.values(req.session.cart); //get items as array
        const totalPrice = items.reduce((acc, item) => {
            return acc + item.price * item.count;
        }, 0);
        const newOrder = await Order.create({
            totalPrice,
            userId: req.currentUser.id,
        });
        for (const item of items) {
            await newOrder.addProduct(item.id, {
                through: { price: item.price, count: item.count },
            });
        }

        req.session.cart = {};

        const order = await Order.findByPk(newOrder.id, {
            include: ["products", "user"],
        });
        const preference = await generatePreference(req.get("host"), order);
        order.status = orderStatus.PAYMENT_PENDING;
        order.paymentMethod = paymentMethod.MERCADOPAGO;
        order.preferenceId = preference.id;
        await order.save();

        res.redirect(preference.init_point);
    },

    async addToCart(req, res) {
        const product = await Product.findByPk(req.params.id);
        if (!req.session.cart[product.id]) {
            req.session.cart[product.id] = {
                id: product.id,
                name: product.name,
                image: product.image,
                price: Number(
                    (product.price - product.price * (product.discount / 100)).toFixed(2)
                ),
                count: 0,
            };
        }
        req.session.cart[product.id].count++;

        res.redirect("back");
    },

    async removeFromCart(req, res) {
        req.session.cart[req.params.id] = undefined;
        res.redirect("back");
    },

    async createOrderFromCart(req, res) {
        res.redirect("/me/orders/" + newOrder.id);
    },
};
