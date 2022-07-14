const { Router } = require("express");
const router = Router();
module.exports = router;

const controller = require("../controllers/cart-controller");

router.get("/", controller.viewCart);
router.post("/buy", controller.buyCart);

router.post("/:id", controller.addToCart);
router.delete("/:id", controller.removeFromCart);
