import { Router } from 'express';
import multer from 'multer';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsControllerspec';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImage/UploadCarImagesController';

import uploadConfig from '../../../../config/upload';
import ensureAdmin from '../middlewares/ensureAdmin';
import ensureAuthenticate from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();
const upload = multer(uploadConfig);

carsRoutes.post(
  '/',
  ensureAuthenticate,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticate,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post(
  '/images/:id',
  ensureAuthenticate,
  ensureAdmin,
  upload.array('images'),
  uploadCarImagesController.handle
);

export { carsRoutes };
