import { Router } from 'express';
import { UserControllers } from './user.controller';

const router: Router = Router();

router.post('/', UserControllers.createAdmin);

export const userRoutes = router;