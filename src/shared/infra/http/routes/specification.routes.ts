import { Router } from 'express';

import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationController } from '../../../../modules/cars/useCases/listSpecification/ListSpecificationController';
import ensureAdmin from '../middlewares/ensureAdmin';
import ensureAuthenticate from '../middlewares/ensureAuthenticated';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRoutes.use(ensureAuthenticate);

specificationsRoutes.post(
  '/',
  ensureAuthenticate,
  ensureAdmin,
  createSpecificationController.handle
);

specificationsRoutes.get('/', listSpecificationController.handle);

export { specificationsRoutes };
