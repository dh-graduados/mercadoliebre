const { DataTypes } = require("sequelize");
const OrderStatus = require("../../utils/order-status");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Orders", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            totalPrice: {
                allowNull: false,
                type: DataTypes.DECIMAL(25, 2),
            },
            status: {
                allowNull: false,
                type: DataTypes.STRING,
                defaultValue: OrderStatus.CREATED,
            },
            paymentMethod: {
                type: DataTypes.STRING,
            },
            paymentId: {
                type: DataTypes.STRING,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
        });

        await queryInterface.createTable("OrderProduct", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            price: {
                allowNull: false,
                type: DataTypes.DECIMAL(25, 2),
            },
            count: {
                allowNull: false,
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 1,
            },
            orderId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "Orders",
                    key: "id",
                },
            },
            productId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "Products",
                    key: "id",
                },
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("OrderProduct");
        await queryInterface.dropTable("Orders");
    },
};
