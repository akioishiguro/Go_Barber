// Esta rota cuida dos usuarios de nossa aplicação
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserServices';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarServices';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

// Criação de um Usuario
usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const userRepository = new UserRepository();
  const createUser = new CreateUserService(userRepository);

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  // Deleta a senha para não mostrar na resposta
  delete user.password;

  return response.json(user);
});

// Adicionar um Avatar - Utilizamos o ensureAuthenticated, para certificicar a autenticação
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const userRepository = new UserRepository();
    const updateUserAvatar = new UpdateUserAvatarService(userRepository);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    console.log(request.file);
    return response.json(user);
  },
);

export default usersRouter;
