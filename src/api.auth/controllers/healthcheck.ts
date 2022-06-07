import { Request, Response } from 'express';
import { route, GET } from 'awilix-express';
import { HealthService } from '../services/health.service';

@route('/')
export class CheckController {
  constructor(private readonly healthServiceContainer: HealthService) {}

  @route('healthcheck')
  @GET()
  public status(req: Request, res: Response): void {
    res
      .status(200)
      .send({ healthStatus: this.healthServiceContainer.getHealth() });
  }
}
