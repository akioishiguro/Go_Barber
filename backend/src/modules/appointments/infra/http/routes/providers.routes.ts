// Esta rota cuida dos agendamentos de nossa aplicação
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvalabiliryController from '../controllers/ProviderMonthAvalabiliryController';
import ProviderDayAvalabiliryController from '../controllers/ProviderDayAvalabiliryController';

const ProviderRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvalabiliryController = new ProviderMonthAvalabiliryController();
const providerDayAvalabiliryController = new ProviderDayAvalabiliryController();

ProviderRouter.use(ensureAuthenticated);

ProviderRouter.get('/', providersController.index);
ProviderRouter.get(
  '/:provider_id/month-avalability',
  providerMonthAvalabiliryController.index,
);
ProviderRouter.get(
  '/:provider_id/day-avalability',
  providerDayAvalabiliryController.index,
);

export default ProviderRouter;
