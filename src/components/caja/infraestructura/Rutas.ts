
import { Router } from 'express';
const acciones = require('./Acciones');
const router: Router = Router();

 router.post('/agregarBaseCaja', acciones.agregarBaseCaja);
 router.post('/vaciarCaja', acciones.vaciarCaja);
 router.get('/estadoActualCaja', acciones.estadoActualCaja);
 router.post('/registrarPagoCaja', acciones.realizarPagoCaja);
 router.post('/reconstruirCaja', acciones.reconstruirCaja);


 module.exports = router;