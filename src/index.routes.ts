const express = require('express');

const app = express();

app.use("/caja", require('./components/caja/infraestructura/Rutas'));
app.use("/caja", require('./components/movimiento/infraestructura/Rutas'));


module.exports = app;