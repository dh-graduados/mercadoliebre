const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require(__dirname + "/../../config/sequelize.js");
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    logging: (msg) => {
        console.log(`[sequelize] ${msg}`);
    },
});

fs.readdirSync(__dirname)
    .filter((file) => {
        return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

(async () => {
    try {
        await sequelize.authenticate();
        console.log("[sequelize] Connection has been established successfully.");
    } catch (error) {
        console.error("[sequelize] Unable to connect to the database:", error);
    }
})();
