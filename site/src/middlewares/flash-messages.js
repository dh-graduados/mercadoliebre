module.exports = (req, res, next) => {
    req.flash = (key, message) => {
        const flashDictionary = req.session.flashDictionary;

        if (typeof message == "object") {
            flashDictionary[key] = Object.assign(
                flashDictionary[key] || {},
                message
            );
        } else {
            flashDictionary[key] = message;
        }
    };

    const flashDictionary = req.session.flashDictionary;

    if (flashDictionary && Object.keys(flashDictionary).length > 0) {
        res.locals = {
            ...res.locals,
            ...flashDictionary,
        };
    }

    req.session.flashDictionary = {};

    next();
};
