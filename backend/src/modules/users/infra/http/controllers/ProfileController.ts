import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class UsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfiler = container.resolve(ShowProfileService);

    const user = await showProfiler.execute({ user_id });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateProfiler = container.resolve(UpdateProfileService);

    const user = await updateProfiler.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    // Deleta a senha para não mostrar na resposta
    delete user.password;

    return response.json(user);
  }
}
