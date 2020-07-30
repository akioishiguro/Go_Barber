import { startOfHour, isBefore, getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsReposiry from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsReposiry,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date); // Agendamento comeca em hora em hora

    // Verfica se o horario solicitado não está no passado
    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You cant create an appointment a past date');
    }

    // Não permite que um Usuario/Provider, marque um horario apra ele mesmo
    if (provider_id === user_id) {
      throw new AppError('You cant create an appointment with yourself');
    }

    // Verfifica se o horario esta entre 8am e 5pm
    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only create appointments between 8am and 5pm',
      );
    }

    // Verifica se já existe, algum agendamento neste horario
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is alredy booked');
    }

    // Ele cria um agendamento através do Id do usuario
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
