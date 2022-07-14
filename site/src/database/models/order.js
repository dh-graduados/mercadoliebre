const { DataTypes } = require("sequelize");
const orderStatus = require("../../utils/order-status");

module.exports = (sequelize) => {
    const model = sequelize.define("Order", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        totalPrice: DataTypes.DECIMAL(25, 2),
        status: {
            type: DataTypes.STRING,
            defaultValue: orderStatus.CREATED,
        },
        paymentId: DataTypes.STRING,
        paymentMethod: DataTypes.STRING,
    });

    model.associate = (models) => {
        model.belongsTo(models.User, {
            as: "user",
            foreignKey: "userId",
        });
        model.belongsToMany(models.Product, {
            as: "products",
            through: models.OrderProduct,
        });
    };

    return model;
};
