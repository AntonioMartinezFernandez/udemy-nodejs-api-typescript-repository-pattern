// Environment variables
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

// Environment configuration files
import dotenv from 'dotenv';
dotenv.config({
  path: `${__dirname}/config/${process.env.APP_ENV}.env`,
});

// Libraries
import express from 'express';
import { loadControllers } from 'awilix-express';

// Express app instance
const app: express.Application = express();

// Body Parser
app.use(express.json());

// Dependency Injection Container
import containerLoader from './container';
containerLoader(app);

// Controllers loader
app.use(loadControllers('controllers/**/*', { cwd: __dirname }));

// Export app instance
export { app };
