const fs = require("fs/promises");
const path = require("path");

require("dotenv").config();
const fetch = require("node-fetch");

const outputFilePath = path.join(__dirname, "generated-mp-users.json");

async function getUser(type) {
    const response = await fetch("https://api.mercadopago.com/users/test", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
            site_id: process.env.MP_SITE_ID,
            description: "MercadoLiebre - " + type,
        }),
    });

    return await response.json();
}

async function main() {
    if (!process.env.MP_SITE_ID || !process.env.MP_ACCESS_TOKEN) {
        console.error(
            "Debés configurar MP_SITE_ID y MP_ACCESS_TOKEN como dice docs/MERCADOPAGO.md"
        );
    }

    if (!process.env.MP_ACCESS_TOKEN.startsWith("TEST")) {
        console.error("Esta operación solo se puede realizar con un ACCESS_TOKEN de testing");
        return;
    }

    if (fileExists()) {
        console.error(
            "!!!Cuidado!!!, ya tenés usuarios generados! Cada cuenta tiene un limite. Para forzar la generación borrá el archivo .json"
        );
        return;
    }

    const seller = await getUser("seller");
    const buyer = await getUser("buyer");

    await fs.writeFile(
        outputFilePath,
        JSON.stringify(
            {
                seller,
                buyer,
            },
            null,
            4
        )
    );
}

main();
