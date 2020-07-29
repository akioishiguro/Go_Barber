import AppError from '@shared/errors/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showProfileService = new ShowProfileService(fakeUserRepository);
  });
  it('Should be able show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const updatedUser = await showProfileService.execute({
      user_id: user.id,
    });

    expect(updatedUser.name).toBe('John Doe');
    expect(updatedUser.email).toBe('johndoe@gmail.com');
  });

  it('Should not be able show the profile from non-existing user', async () => {
    expect(
      showProfileService.execute({
        user_id: 'non-existing user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
