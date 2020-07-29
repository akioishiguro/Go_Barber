// Esta rota cuida dos usuarios de nossa aplicação
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

// Criação de um Usuario
profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
