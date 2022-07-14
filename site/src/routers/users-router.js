const { Router } = require("express");
const router = Router();
module.exports = router;

const ordersRouter = require("./orders-router");
const cartRouter = require("./cart-router");
const loggedGuard = require("../middlewares/logged-guard");

router.use("/cart", cartRouter);
router.use("/orders", loggedGuard, ordersRouter);
