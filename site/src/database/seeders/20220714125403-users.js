"use strict";
const uuid = require("uuid");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const userRoles = require("../../utils/user-roles");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Users", [
            {
                id: uuid.v4(),
                email: "testbuyer@test.com",
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                password: await bcrypt.hash("user1234", 12),
                role: userRoles.BUYER,
                profilePic: "/img/default-avatar.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuid.v4(),
                email: "pbaleztena@digitalhouse.com",
                firstName: "Pablo",
                lastName: "Baleztena",
                password: await bcrypt.hash("user1234", 12),
                role: userRoles.ADMIN,
                profilePic: "/img/default-avatar.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
