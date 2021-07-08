
import { Router } from 'express';
const { newProduct } = require('./Actions');
const router: Router = Router();


 router.post('/', newProduct);


 module.exports = router;