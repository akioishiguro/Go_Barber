import { container } from 'tsyringe';

import IHashProvider from '@modules/users/provider/HashProvider/models/IHashProvider';
import BCryptHashProvider from '@modules/users/provider/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
