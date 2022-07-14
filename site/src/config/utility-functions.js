module.exports = {
    config(app) {
        app.locals.getProductPrice = function (product) {
            return (product.price - product.price * (product.discount / 100)).toLocaleString(
                "es-ar",
                {
                    minimumFractionDigits: 2,
                }
            );
        };

        app.locals.getOldValue = (locals, key) => {
            return locals.oldData && locals.oldData[key] ? locals.oldData[key] : "";
        };
    },
};
