// Esta rota cuida dos agendamentos de nossa aplicação
import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentServices from '@modules/appointments/services/CreateAppointmentServices';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuthenticated);

/*
appointmentsRouter.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});
*/

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date); // Transforma a hora em uma string

  const createAppointmentServices = new CreateAppointmentServices(
    appointmentsRepository,
  );

  // Chamada de criação do agendamento, onde passamos a data  e o Id do usuario
  const appointment = await createAppointmentServices.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
