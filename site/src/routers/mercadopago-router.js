const { Router } = require("express");
const router = Router();
module.exports = router;

const controller = require("../controllers/mercadopago-controller");

router.get("/status/:id", controller.backUrl);
