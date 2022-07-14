const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const model = sequelize.define(
        "OrderProduct",
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            price: DataTypes.DECIMAL(25, 2),
            count: DataTypes.INTEGER.UNSIGNED,
        },
        {
            tableName: "OrderProduct",
            timestamps: false,
        }
    );

    return model;
};
