import { Router } from 'express';
import { CreateOrganization, CreateOrganizationTodo, DeleteOrganization, ListOrganization, UpdateOrganization } from '../controllers/organization-controllers';
const router = Router();

//• Crear un endpoint para crear una organización.
router.post('/', CreateOrganization);
router.post('/todo', CreateOrganizationTodo);
//• Crear un endpoint para actualizar una organización.
router.put('/:id', UpdateOrganization);
//• Crear un endpoint para obtener una lista deorganizaciones.
router.get('/', ListOrganization);
//• Crear un endpoint para eliminar una organización.
router.delete('/:id', DeleteOrganization);

export default router;