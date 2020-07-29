import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTOS from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import IFindAllinMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllinMonthFromProviderDTO';

export default interface IAppointmentsRepository {
  create(date: ICreateAppointmentDTOS): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllinMonthFromProviderDTO,
  ): Promise<Appointment[]>;
}
