// Verifica a Disponilidade dos horarios para agendamento

import { injectable, inject } from 'tsyringe';
import { getHours } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabitityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      },
    );

    // Inicio dos agendamentos
    const hourStart = 8;

    // Cria um vetor de agendamentos por dia, como o funcionamento vai ate as 17horas, o tamanho do vetor tem que ser de 10 posições
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    // Função que percorre todos os horarios de um determinado dia, para saber se ele esta vago ou não
    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      return {
        hour,
        available: !hasAppointmentInHour, // falso quer dizer q o horario esta preenchido
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabitityService;
