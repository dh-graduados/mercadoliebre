const { DataTypes } = require("sequelize");
const userRoles = require("../../utils/user-roles");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            firstName: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            lastName: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            email: {
                unique: true,
                allowNull: false,
                type: DataTypes.STRING,
            },
            profilePic: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            role: {
                allowNull: false,
                type: DataTypes.STRING,
                defaultValue: userRoles.BUYER,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Users");
    },
};
