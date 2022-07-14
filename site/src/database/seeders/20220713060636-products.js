"use strict";
const { v4 } = require("uuid");
const uuid = v4;
const { faker } = require("@faker-js/faker");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Products",
            Array(100)
                .fill(0)
                .map(() => {
                    return {
                        id: uuid(),
                        name: faker.commerce.productName(),
                        description: faker.commerce.productDescription(),
                        price: faker.commerce.price(),
                        discount: (Math.random() * 90).toFixed(0),
                        image: "/img/default-image.jpg",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    };
                })
        );
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Products", null, {});
    },
};
