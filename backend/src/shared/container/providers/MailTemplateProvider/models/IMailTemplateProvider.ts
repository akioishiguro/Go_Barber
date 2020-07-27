import IParseMailProviderDTO from '../dtos/IParseMailProviderDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseMailProviderDTO): Promise<string>;
}
