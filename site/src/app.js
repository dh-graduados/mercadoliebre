const dotenv = require("dotenv");

const createApp = require("./config/create-app");
const appConfig = require("./config/app-config");
const middlewaresConfig = require("./config/middlewares-config");
const logsConfig = require("./config/logs-config");
const mainRouter = require("./routers/main-router");
const utilityFunctions = require("./config/utility-functions");
const cronConfig = require("./config/cron-config");

// LOAD .env
dotenv.config();

// CREATE EXPRESS APP
const app = createApp();

// SETUP APP CONFIGURATION
appConfig.config(app);
utilityFunctions.config(app);

// SETUP LOGGING
logsConfig.config(app);

//SETUP GLOBAL MIDDLEWARES
middlewaresConfig.config(app);

// MOUNT MAIN ROUTER
app.use(mainRouter);

//SCHEDULE CRON JOBS
cronConfig.config();
