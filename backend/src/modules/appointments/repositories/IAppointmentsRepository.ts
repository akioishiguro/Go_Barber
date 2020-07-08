import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTOS from '@modules/appointments/dtos/ICreateAppointmentsDTO';

export default interface IAppointmentsRepository {
  create(date: ICreateAppointmentDTOS): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
