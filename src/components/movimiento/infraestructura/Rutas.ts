
import { Router } from 'express';
const acciones = require('./Acciones');
const router: Router = Router();

 router.get('/obtenerMovimientos', acciones.obtenerMovimientos);
 module.exports = router;