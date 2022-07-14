const { body, checkSchema } = require("express-validator");

const { User } = require("../database/models");

const isDevServer = require("../utils/is-dev-server")();

module.exports = [
    body("email", "Debe utilizar un email válido")
        .normalizeEmail({
            gmail_remove_subaddress: isDevServer,
        })
        .isEmail()
        .bail()
        .custom(async (value) => {
            const user = await User.findOne({
                where: {
                    email: value,
                },
            });
            if (user) {
                throw new Error("Email ya registrado");
            }
            return true;
        }),
    body("firstName", "Debe tener 2 o más caracteres").isLength({ min: 2 }),
    body("lastName", "Debe tener 2 o más caracteres").isLength({ min: 2 }),
    body(
        "password",
        "Debe tener al menos 8 caracteres, con una minúscula, una mayúscula, un numero y un símbolo"
    ).isStrongPassword(),
    body("rePassword", "Las contraseñas no coinciden")
        .notEmpty()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Las contraseñas no coinciden");
            }
            return true;
        }),
    checkSchema({
        profilePic: {
            custom: {
                options: (value, { req }) => !!req.file,
                errorMessage: "Debe cargar un archivo de imagen",
            },
        },
    }),
];
