import { Request, Response } from 'express';

import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentServices from '@modules/appointments/services/CreateAppointmentServices';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date); // Transforma a hora em uma string

    const createAppointmentServices = container.resolve(
      CreateAppointmentServices,
    );

    // Chamada de criação do agendamento, onde passamos a data  e o Id do usuario
    const appointment = await createAppointmentServices.execute({
      date: parsedDate,
      provider_id,
      user_id,
    });

    return response.json(appointment);
  }
}
