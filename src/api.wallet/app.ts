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

// Body Parser
app.use(express.json());

// Dependency Injection Container
import containerLoader from './container';
containerLoader(app);

app.use(loadControllers('controllers/**/*', { cwd: __dirname }));

export { app };
