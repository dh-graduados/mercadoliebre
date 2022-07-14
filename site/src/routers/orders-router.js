const { Router } = require("express");
const router = Router();
module.exports = router;

const controller = require("../controllers/orders-controller");

router.get("/", controller.viewOrders);

router.post("/:id/pay/mercadopago", controller.startMercadopagoPayment);
