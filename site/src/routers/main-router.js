const { Router } = require("express");
const router = Router();
module.exports = router;

const controller = require("../controllers/main-controller");

const productsRouter = require("./products-router");
const usersRouter = require("./users-router");
const authRouter = require("./auth-router");
const mercadopagoRouter = require("./mercadopago-router");

router.get("/", controller.home);

router.use("/", authRouter);

router.use("/products", productsRouter);
router.use("/me", usersRouter);
router.use("/mercadopago", mercadopagoRouter);
