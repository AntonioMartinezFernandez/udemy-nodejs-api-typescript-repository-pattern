// Libraries
import express from 'express';
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';

// Import services and repositories to contain
import { TestService } from './services/test.service';
import { SubscriptionMySQLRepository } from './repositories/implementation/MySQL/subscription.MySQL.repository';
import { SubscriptionService } from './services/subscription.service';

// Config container and register services and repositories
const containerLoader = (app: express.Application) => {
  const container = createContainer({ injectionMode: 'CLASSIC' }); //! In CLASSIC mode, the code can't be minified

  container.register({
    //! Structure:
    //!   nameOfInjectableModule: asClass(NameOfClassToInject).scoped()

    // Repositories
    subscriptionRepoContainer: asClass(SubscriptionMySQLRepository).scoped(),

    // Services
    testServiceContainer: asClass(TestService).scoped(),
    subscriptionServiceContainer: asClass(SubscriptionService).scoped(),
  });

  app.use(scopePerRequest(container));
};

// Export container
export default containerLoader;
