import { Request, Response } from 'express';
import { route, GET } from 'awilix-express';
import { TestService } from '../services/test.service';

@route('/')
export class CheckController {
  constructor(private readonly testServiceContainer: TestService) {}

  @route('status')
  @GET()
  public index(req: Request, res: Response): void {
    res
      .status(200)
      .send({ NODE_ENV: process.env.NODE_ENV, APP_ENV: process.env.APP_ENV });
  }

  @route('date')
  @GET()
  public status(req: Request, res: Response): void {
    res.status(200).send({ date: this.testServiceContainer.getDate() });
  }
}
