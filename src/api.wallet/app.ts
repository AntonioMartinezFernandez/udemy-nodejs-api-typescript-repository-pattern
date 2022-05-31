// Env variables
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

// Env files
import dotenv from 'dotenv';
dotenv.config({
  path: `${__dirname}/config/${process.env.APP_ENV}.env`,
});

// Dependencies
import express from 'express';
import { loadControllers } from 'awilix-express';

// App
const app: express.Application = express();

// Dependency Injection Container
import loadContainer from './container';
loadContainer(app);

app.use(loadControllers('controllers/*.ts', { cwd: __dirname }));

export { app };
