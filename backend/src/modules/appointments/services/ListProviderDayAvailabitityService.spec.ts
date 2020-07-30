import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabitityService from './ListProviderDayAvailabitityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabitityService: ListProviderDayAvailabitityService;

describe('ListProvider', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderDayAvailabitityService = new ListProviderDayAvailabitityService(
      fakeAppointmentsRepository,
    );
  });
  it('Should be able to list the month availability from provider', async () => {
    // Lembrar que o a biblioteca Date tem Janeiro na posiçao 0, logo: Fevereiro 1, Março 2....

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    // Chama a função Date.now apenas uma vez(mockimplementationOnce) e seta as variaveis de Data
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availability = await listProviderDayAvailabitityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: true },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
