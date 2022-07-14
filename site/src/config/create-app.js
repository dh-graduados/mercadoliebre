const express = require("express");

module.exports = function createExpressApp() {
    const app = express();

    const PORT = process.env.PORT ?? 3000;
    app.listen(PORT, () => {
        console.log(`Servidor de express escuchando puerto ${PORT}`);
    });

    return app;
};
