# Historial de planes

Se agregó una pantalla para consultar acciones importantes realizadas sobre los planes.

El historial registra:

- Plan confirmado.
- Plan cancelado.

Los eventos se guardan en SQLite y se muestran del más reciente al más antiguo.

## Mejora de interacción

Antes no existía una forma directa de entrar al historial desde la pantalla Mis planes.

Se agregó el botón:

Ver historial

para acceder directamente. Se agregó un acceso directo al historial desde Mis planes para reducir pasos y facilitar la acción, relacionado con Fitts.

## Antes

![Antes del historial](../docs/evidencias/historial-antes.png)

## Después

![Después del historial](../docs/evidencias/historial-despues.png)

## Código relacionado

- frontend/inicio.html
- frontend/js/inicio.js
- frontend/historial.html
- frontend/js/historial.js
- backend/historial.js
