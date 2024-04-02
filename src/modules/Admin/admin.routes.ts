
import { Router } from 'express';
import { AdminControllers } from './admin.controller';

const router: Router = Router();

router.get('/', AdminControllers.getAllAdmin);
router.get('/:id', AdminControllers.getAdminByID);
router.patch('/:id', AdminControllers.updateAdminByID);
router.delete('/:id', AdminControllers.deleteFromDB);


export const AdminRoutes = router;