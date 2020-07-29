import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProviderService from '@modules/appointments/services/ListProviderService';

let fakeUserRepository: FakeUserRepository;
let listProvider: ListProviderService;

describe('ListProvider', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    listProvider = new ListProviderService(fakeUserRepository);
  });
  it('Should be able to list the profile', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'John tre',
      email: 'johntre@gmail.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'John qua',
      email: 'johnqua@gmail.com',
      password: '123456',
    });

    const providers = await listProvider.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
