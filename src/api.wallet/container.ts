// Libraries
import express from 'express';
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';

// Import services, repositories and utils to contain
import { TestService } from './services/test.service';

import { SubscriptionMockRepository } from './repositories/implementation/Mock/subscription.mock.repository';
import { MovementMockRepository } from './repositories/implementation/Mock/movement.mock.repository';
import { BalanceMockRepository } from './repositories/implementation/Mock/balance.mock.repository';

import { SubscriptionMySQLRepository } from './repositories/implementation/MySQL/subscription.MySQL.repository';
import { MovementMySQLRepository } from './repositories/implementation/mysql/movement.MySQL.repository';
import { BalanceMySQLRepository } from './repositories/implementation/mysql/balance.MySQL.repository';

import { SubscriptionMongodbRepository } from './repositories/implementation/mongodb/subscription.mongodb.repository';
import { MovementMongodbRepository } from './repositories/implementation/mongodb/movement.mongodb.repository';
import { BalanceMongodbRepository } from './repositories/implementation/mongodb/balance.mongodb.repository';

import { SubscriptionService } from './services/subscription.service';
import { MovementService } from './services/movement.service';

import { UuidGenerator } from './common/utils/implementations/uuidGenerator';

// Config container and register services and repositories
const containerLoader = (app: express.Application) => {
  const container = createContainer({ injectionMode: 'CLASSIC' }); //! In CLASSIC mode, the code can't be minified

  container.register({
    //! Structure:
    //!   nameOfInjectableModule: asClass(NameOfClassToInject).scoped()

    //* Repositories
    // subscriptionRepoContainer: asClass(SubscriptionMockRepository).scoped(),
    // movementRepoContainer: asClass(MovementMockRepository).scoped(),
    // balanceRepoContainer: asClass(BalanceMockRepository).scoped(),

    //subscriptionRepoContainer: asClass(SubscriptionMySQLRepository).scoped(),
    //movementRepoContainer: asClass(MovementMySQLRepository).scoped(),
    //balanceRepoContainer: asClass(BalanceMySQLRepository).scoped(),

    subscriptionRepoContainer: asClass(SubscriptionMongodbRepository).scoped(),
    movementRepoContainer: asClass(MovementMongodbRepository).scoped(),
    balanceRepoContainer: asClass(BalanceMongodbRepository).scoped(),

    //* Services
    testServiceContainer: asClass(TestService).scoped(),
    subscriptionServiceContainer: asClass(SubscriptionService).scoped(),
    movementServiceContainer: asClass(MovementService).scoped(),

    //* Utils
    uuidGeneratorContainer: asClass(UuidGenerator).scoped(),
  });

  app.use(scopePerRequest(container));
};

// Export container
export default containerLoader;
