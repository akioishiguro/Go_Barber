// Esta rota cuida dos agendamentos de nossa aplicação
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const ProviderRouter = Router();
const providersController = new ProvidersController();

ProviderRouter.use(ensureAuthenticated);

ProviderRouter.get('/', providersController.index);

export default ProviderRouter;
