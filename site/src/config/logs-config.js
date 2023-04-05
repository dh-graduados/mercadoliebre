const { join } = require("path");

const morgan = require("morgan");
const rfs = require("rotating-file-stream");

module.exports = {
    config(app) {
        const NODE_ENV = process.env.NODE_ENV || "development";

        app.use(morgan("dev"));

        if (NODE_ENV == "production") {
            // CREATE A ROTATING WRITE STREAM
            const accessLogStream = rfs.createStream("access.log", {
                interval: "1d", // rotate daily
                path: join(__dirname, "..", "..", "logs"),
            });

            // CONFIGURE MORGAN FOR PRODUCTION
            app.use(
                morgan("combined", {
                    stream: accessLogStream,
                })
            );
        }
    },
};
