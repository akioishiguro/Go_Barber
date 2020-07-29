import { Router } from 'express';

import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import passwordRoutes from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

// marcar um horario
routes.use('/appointments', appointmentsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/password', passwordRoutes);
routes.use('/profile', profileRouter);

export default routes;
