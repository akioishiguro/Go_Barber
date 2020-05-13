import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date); // Agendamento comeca em hora em hora

    // Verifica se já existe, algum agendamento neste horario
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is alredy booked');
    }

    // Ele cria um agendamento através do Id do usuario
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    // Salva o agendamento no banco
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
