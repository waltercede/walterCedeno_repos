

import { Router } from 'express';
import { generateCsvMetrics, metricsAndRepository } from '../controllers/metrics-controller';
const router = Router();

//• Crear un solo endpoint que cumpla con los escenarios planteados.
router.get('/:id', metricsAndRepository);
//• Crear un endpoint que genere el reporte csv
router.get('/generarcsv/:id', generateCsvMetrics);

export default router;