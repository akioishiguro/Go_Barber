import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

// marcar um horario
routes.use('/appointments', appointmentsRouter);

export default routes;
