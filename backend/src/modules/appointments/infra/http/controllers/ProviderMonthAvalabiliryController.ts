import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProviderMonthAvailabitityService from '@modules/appointments/services/ListProviderMonthAvailabitityService';

export default class ProviderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listProviderMonthAvailabitity = container.resolve(
      ListProviderMonthAvailabitityService,
    );

    const providers = await listProviderMonthAvailabitity.execute({
      provider_id,
      month,
      year,
    });

    return response.json(providers);
  }
}
