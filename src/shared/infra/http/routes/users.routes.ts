import { Router } from 'express';
import multer from 'multer';

import { ProfileUserController } from '@modules/accounts/useCases/profileUserUseCase/ProfileUserController';

import uploadConfig from '../../../../config/upload';
import { CreateUserController } from '../../../../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import ensureAdmin from '../middlewares/ensureAdmin';
import ensureAuthenticate from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

const uploadAvatar = multer(uploadConfig);

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticate,
  ensureAdmin,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);

usersRoutes.get('/profile', ensureAuthenticate, profileUserController.handle);

export { usersRoutes };
