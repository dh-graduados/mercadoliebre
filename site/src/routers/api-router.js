const { Router } = require("express");
const router = Router();
module.exports = router;

const cors = require("cors");
const productsController = require("../controllers/api/products-controller");

router.get("/products", cors("*"), productsController.listProducts);
