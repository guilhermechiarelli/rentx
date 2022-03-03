import { Router } from 'express';

import { authenticateRoutes } from './authentication.routes';
import { categoriesRoutes } from './categories.routes';
import { passwordRoutes } from './password.routes';
import { rentalRoutes } from './rentals.routes';
import { specificationsRoutes } from './specification.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use('/rentals', rentalRoutes);
router.use('/sessions', authenticateRoutes);
router.use('/password', passwordRoutes);

export default router;
