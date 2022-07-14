module.exports = function isDevServer() {
    return process.env.NODE_ENV == "development" || !process.env.NODE_ENV;
};
