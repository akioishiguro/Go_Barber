// Verifica a Disponilidade dos horarios para agendamento

import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

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

    // Pegamos o horario atual para podermos comparar mais tarde
    const currentDate = new Date(Date.now());

    // Função que percorre todos os horarios de um determinado dia, para saber se ele esta vago ou não
    const availability = eachHourArray.map(hour => {
      // Verficia se naquele horario ja possui um agendamento, caso exista, ele retorna true
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      // Available falso quer dizer q o horario esta preenchido - Tbm verificamos se o horario de agendamento não é depois da hora atual
      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabitityService;
