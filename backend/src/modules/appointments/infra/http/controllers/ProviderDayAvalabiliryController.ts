import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProviderDayAvailabitityService from '@modules/appointments/services/ListProviderDayAvailabitityService';

export default class ProviderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const listProviderDayAvailabitity = container.resolve(
      ListProviderDayAvailabitityService,
    );

    const providers = await listProviderDayAvailabitity.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(providers);
  }
}
