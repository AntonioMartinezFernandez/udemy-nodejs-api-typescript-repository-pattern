import express from 'express';
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';

import { TestService } from './services/test.service';
import { SubscriptionMySQLRepository } from './repositories/implementation/subscription.MySQL.repository';
import { SubscriptionService } from './services/subscription.service';

const containerLoader = (app: express.Application) => {
  const container = createContainer({ injectionMode: 'CLASSIC' });

  container.register({
    // Repositories
    subscriptionRepoContainer: asClass(SubscriptionMySQLRepository).scoped(),

    // Services
    testServiceContainer: asClass(TestService).scoped(),
    subscriptionServiceContainer: asClass(SubscriptionService).scoped(),
  });

  app.use(scopePerRequest(container));
};

export default containerLoader;
