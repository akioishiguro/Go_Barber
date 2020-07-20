import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPassword: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPassword = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });
  it('Should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await sendForgotPassword.execute({
      email: 'johndoe@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to recover a non-existing user password ', async () => {
    await expect(
      sendForgotPassword.execute({
        email: 'johndoe@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await sendForgotPassword.execute({
      email: 'johndoe@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
