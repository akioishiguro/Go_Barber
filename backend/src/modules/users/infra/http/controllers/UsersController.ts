import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserServices';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);
    console.log(name);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    // Deleta a senha para não mostrar na resposta
    delete user.password;

    return response.json(user);
  }
}
