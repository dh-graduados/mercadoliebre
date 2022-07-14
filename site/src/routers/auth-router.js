const { Router } = require("express");
const router = Router();
module.exports = router;

const authController = require("../controllers/auth-controller");
const urlencodedData = require("../middlewares/urlencoded-data");
const validationGuard = require("../middlewares/validation-guard");
const fileUpload = require("../middlewares/file-upload");
const loginValidation = require("../validators/login-validation");
const registerValidation = require("../validators/register-validation");

router.get("/login", authController.viewLogin);
router.get("/register", authController.viewRegister);

router.post("/login", urlencodedData, loginValidation, validationGuard, authController.login);
router.post(
    "/register",
    fileUpload.single("profilePic", {
        publicDir: "img/users",
        fileSize: 1 * Math.pow(1024, 2) /* MBs*/,
    }),
    registerValidation,
    validationGuard,
    authController.register
);

router.post("/logout", authController.logout);
