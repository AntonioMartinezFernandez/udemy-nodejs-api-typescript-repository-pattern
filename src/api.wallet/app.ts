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

// Dependency Injection Container
import { container } from './container';
import { TestService } from './services/test.service';

const testService = container.resolve<TestService>('testService');
console.log(testService.getDate());

// App
const app: express.Application = express();

app.get('/', (req: express.Request, res: express.Response) => {
  res
    .status(200)
    .send({ status: 'healthy', 'app environment': `${process.env.APP_ENV}` });
});

export { app };
