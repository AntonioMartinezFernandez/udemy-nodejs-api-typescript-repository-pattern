// Libraries
import express from 'express';
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';

// Import services, repositories and utils to contain
import { HealthService } from './services/health.service';

import { UserMockRepository } from './repositories/implementation/Mock/user.mock.repository';
import { UserMysqlRepository } from './repositories/implementation/MySQL/user.mysql.repository';
import { UserMongodbRepository } from './repositories/implementation/mongodb/user.mongodb.repository';

import { UserService } from './services/user.service';

import { Encrypter } from './common/utils/encrypter';
import { Jsonwebtoken } from './common/utils/jsonwebtoken';

// Config container and register services and repositories
const dependencyContainerLoader = (app: express.Application) => {
  const container = createContainer({ injectionMode: 'CLASSIC' }); //! In CLASSIC mode, the code can't be minified

  container.register({
    //! Structure:
    //!   nameOfInjectableModule: asClass(NameOfClassToInject).scoped()

    //* Repositories
    // userRepoContainer: asClass(UserMockRepository).scoped(),
    userRepoContainer: asClass(UserMysqlRepository).scoped(),
    // userRepoContainer: asClass(UserMongodbRepository).scoped(),

    //* Services
    healthServiceContainer: asClass(HealthService).scoped(),
    userServiceContainer: asClass(UserService).scoped(),

    //* Utils
    encrypterContainer: asClass(Encrypter).scoped(),
    jwtContainer: asClass(Jsonwebtoken).scoped(),
  });

  app.use(scopePerRequest(container));
};

// Export container
export default dependencyContainerLoader;
