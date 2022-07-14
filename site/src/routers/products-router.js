const { Router } = require("express");
const router = Router();
module.exports = router;

const controller = require("../controllers/products-controller");

router.get("/:id", controller.detail);
