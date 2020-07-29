import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabitityService from './ListProviderMonthAvailabitityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabitity: ListProviderMonthAvailabitityService;

describe('ListProvider', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailabitity = new ListProviderMonthAvailabitityService(
      fakeAppointmentsRepository,
    );
  });
  it('Should be able to list the month availability from provider', async () => {
    // Lembrar que o a biblioteca Date tem Janeiro na posiçao 0, logo: Fevereiro 1, Março 2....
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 3, 21, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailabitity.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 19, available: true },
      ]),
    );
  });
});
