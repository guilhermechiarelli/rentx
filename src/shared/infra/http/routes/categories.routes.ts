import { Router } from 'express';
import Multer from 'multer';

import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController';
import ensureAdmin from '../middlewares/ensureAdmin';
import ensureAuthenticate from '../middlewares/ensureAuthenticated';

const categoriesRoutes = Router();

const multer = Multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoriesController();

categoriesRoutes.post(
  '/',
  ensureAuthenticate,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.get('/', listCategoryController.handle);

categoriesRoutes.post(
  '/import',
  ensureAuthenticate,
  ensureAdmin,
  multer.single('file'),
  importCategoryController.handle
);

export { categoriesRoutes };
