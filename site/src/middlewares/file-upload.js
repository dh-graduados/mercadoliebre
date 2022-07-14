const { join, extname } = require("path");
const multer = require("multer");
const uuid = require("uuid");

module.exports = {
    single(field, { fileSize, publicDir }) {
        const storage = multer.diskStorage({
            limits: {
                fileSize: fileSize ?? Number.POSITIVE_INFINITY,
            },
            destination: join(__dirname, "..", "..", "public", publicDir),
            filename: (req, file, cb) => {
                cb(null, uuid.v4() + extname(file.originalname));
            },
        });

        const middleware = multer({ storage });
        return middleware.single(field);
    },
};
