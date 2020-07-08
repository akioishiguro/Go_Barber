import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTOS from '@modules/users/dtos/ICreateUserDTOS';

export default interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(id: ICreateUserDTOS): Promise<User>;
  save(user: User): Promise<User>;
}
