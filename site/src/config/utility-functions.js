function printPrice(value) {
    return value.toLocaleString("es-ar", {
        minimumFractionDigits: 2,
    });
}
module.exports = {
    config(app) {
        app.locals.getProductPrice = function (product) {
            return printPrice(product.price - product.price * (product.discount / 100));
        };

        app.locals.printPrice = printPrice;

        app.locals.getOldValue = (locals, key) => {
            return locals.oldData && locals.oldData[key] ? locals.oldData[key] : "";
        };
    },
};
