import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTOS from '@modules/users/dtos/ICreateUserDTOS';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTOS): Promise<User>;
  save(user: User): Promise<User>;
}
