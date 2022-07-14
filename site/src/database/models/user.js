const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const model = sequelize.define("User", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        profilePic: DataTypes.STRING,
        role: DataTypes.STRING,
    });

    model.associate = (models) => {};

    return model;
};
