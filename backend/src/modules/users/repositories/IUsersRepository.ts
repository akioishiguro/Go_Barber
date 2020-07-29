import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTOS from '@modules/users/dtos/ICreateUserDTOS';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
  findAllProvider(data: IFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTOS): Promise<User>;
  save(user: User): Promise<User>;
}
