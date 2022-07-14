# Pruebas con Mercado Pago

Para poder probar el checkout completo, sin gastar dinero real, hay que generar todo un ambiente de prueba y al menos dos usuarios que puedan hacerse transacciones entre ellos. Más abajo está el paso a paso de como realizarlo.

## Antes de arrancar

1.  Asegúrate de configurar `.env` con `MP_ACCESS_TOKEN` generado en tu cuenta de [Mercadopago Devs](https://www.mercadopago.com.ar/developers/es)
1.  Asegúrate de configurar `.env` con `MP_SITE_ID` con el que corresponda:

    > `MPE`: Mercado Libre Perú,
    > `MLU`: Mercado Libre Uruguay,
    > `MLA`: Mercado Libre Argentina,
    > `MLC`: Mercado Libre Chile,
    > `MCO`: Mercado Libre Colombia,
    > `MLB`: Mercado Libre Brasil,
    > `MLM`: Mercado Libre México

1.  Generá los usuarios de prueba con el comando: `npm run mp:generate:users`.
1.  Obtené las credenciales de prueba `nickname/password` del [archivo generado](../scripts/generated-mp-users.json) para el Vendedor.
1.  En una ventana de incógnito, entrá en [mercadopago developers]([https://www.mercadopago.com.ar/developers/es]) con esas credenciales
1.  Ingresá a "Tus Integraciones > Dashboard" y creá una nueva aplicación. Copiate el ACCESS TOKEN de esa app al json del vendedor asi te queda guardada.
1.  Cambiá el `MP_ACCESS_TOKEN` del `.env` por el nuevo access token.

> Cada cuenta solo puede generar 10 usuarios de prueba y recién expiran a los 60 días de no-uso. Asegurate de **guardar las credenciales** asi no te quedas sin usuarios.

## Pasos para probar un pago

1.  Operá en una ventana de incognito de tu navegador
1.  Generá un pago mediante la aplicación.
1.  Ingresá con un usuario comprador de [este json](../scripts/generated-mp-users.json)
1.  Cargá una tarjeta como medio de pago
    1.  Ingresa los datos de una [tarjeta de prueba](#tarjetas-de-prueba).
    1.  Como nombre de usuario ingresá algun [estado de pago](#diferentes-resultados-de-pago)
    1.  Usa el DNI `1111111` si te lo pide para la tarjeta
1.  Completá el proceso de pago y confirmá que la integracion funciona.
1.  Podes entrar a las cuentas de los usuarios de prueba y ver las transacciones.
1.  Profit

> Importante: Nunca uses tarjetas reales en este proceso

## Info extra

### Tarjetas de prueba

| Tarjeta          | Número           | Código de seguridad | Fecha de caducidad |
| ---------------- | ---------------- | ------------------- | ------------------ |
| Mastercard       | 5031755734530604 | 123                 | 11/25              |
| Visa             | 4509953566233704 | 123                 | 11/25              |
| American Express | 371180303257522  | 1234                | 11/25              |

### Diferentes resultados de pago

| Estado de pago | Descripción                                            | Documento de identidad    |
| -------------- | ------------------------------------------------------ | ------------------------- |
| APRO           | Pago aprobado                                          | DNI del usuario de prueba |
| OTHE           | Rechazado por error general                            | DNI del usuario de prueba |
| CONT           | Pendiente de pago                                      |                           |
| CALL           | Rechazado con validación para autorizar                |                           |
| FUND           | Rechazado por importe insuficiente                     |                           |
| SECU           | Rechazado por código de seguridad inválido             |                           |
| EXPI           | Rechazado debido a un problema de fecha de vencimiento |                           |
| FORM           | Rechazado debido a un error de formulario              |                           |
