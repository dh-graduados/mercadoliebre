const bcrypt = require("bcryptjs");

const { User } = require("../database/models");

module.exports = {
    viewLogin(req, res) {
        res.render("auth/login", {
            backUrl: req.query.backUrl ?? "",
        });
    },

    viewRegister(req, res) {
        res.render("auth/register");
    },

    async login(req, res) {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (user) {
            if (await bcrypt.compare(req.body.password, user.password)) {
                req.session.loggedUserId = user.id;

                res.redirect(req.query.backUrl ?? "/");
                return;
            }
        }

        //Request failed authentication challenge
        req.flash("loginError", "Las credenciales son incorrectas");
        res.redirect("/login");
    },

    async register(req, res) {
        await User.create({
            ...req.body,
            password: await bcrypt.hash(req.body.password, 12),
            profilePic: `/img/users/${req.file.filename}`,
        });

        res.redirect("/login");
    },

    logout(req, res) {
        req.session.loggedUserId = null;

        res.redirect("/");
    },
};
