# Sitio Mercadoliebre

Este sitio es una demostración de un e-commerce simple, utilizando express como servidor de http, sequelize como orm y mercadopago como pasarela de pagos.

## Uso

### Primer uso

Instalar las dependencias del proyecto y preparar el archivo de ambiente:

```bash
npm install
cp .env.example .env
```

Luego modificar el archivo de ambiente (`.env`) según corresponda para su caso.
En cuanto a los settings de Mercadopago, pueden encontrar una guía aquí: [Mercadopago](./docs/MERCADOPAGO.md)

### Inicializando la base de datos

Para inicializar la base de datos, el proyecto provee migraciones y seeders.

```bash
npx sequelize-cli db:create #Crea la base de datos
npx sequelize-cli db:migrate #Ejecuta las migraciones
npx sequelize-cli db:seed:all #Ejecuta los seeders

```

> Estos comandos hay que correrlos solo la primera vez

Usuario de ejemplo:

```
user: testbuyer@test.com
pass: user1234
```

### Encendiendo el proyecto

```bash
npm start
```

## Próximamente

-   Opción para guardar archivos en un bucket de S3
