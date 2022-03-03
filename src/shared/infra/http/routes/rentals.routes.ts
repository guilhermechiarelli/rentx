import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post('/', ensureAuthenticate, createRentalController.handle);
rentalRoutes.post(
  '/devolution/:id',
  ensureAuthenticate,
  devolutionRentalController.handle
);
rentalRoutes.get(
  '/user',
  ensureAuthenticate,
  listRentalsByUserController.handle
);

export { rentalRoutes };
