

import { Router } from 'express';
import { metricsAndRepository } from '../controllers/metrics-controller';
const router = Router();

//• Crear un solo endpoint que cumpla con los escenarios planteados.
router.get('/', metricsAndRepository);


export default router;