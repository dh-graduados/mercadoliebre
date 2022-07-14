const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const model = sequelize.define("Product", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        price: DataTypes.DECIMAL(25, 2),
        discount: DataTypes.FLOAT,
        image: DataTypes.STRING,
    });

    model.associate = (models) => {
        model.belongsToMany(models.Order, {
            through: models.OrderProduct,
        });
    };

    return model;
};
