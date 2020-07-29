import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IHashProvider from '../provider/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfile {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    // Procuro Usuario atraves do ID
    const user = await this.usersRepository.findById(user_id);

    // Verifico se ele existe
    if (!user) {
      throw new AppError('User not found');
    }

    // Procuro pelo email
    const userWithUpdateEmail = await this.usersRepository.findByEmail(email);

    // Verifica se o Emai já existe
    if (userWithUpdateEmail && userWithUpdateEmail.id !== user_id) {
      throw new AppError('E-mail alredy in use');
    }

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set anew password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Password is wrong');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    // Altero os dados
    user.name = name;
    user.email = email;

    return this.usersRepository.save(user);
  }
}

export default UpdateProfile;
