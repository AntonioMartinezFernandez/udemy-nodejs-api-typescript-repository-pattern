import { Response } from 'express';
import { ApplicationException } from '../exceptions/application.exception';

export abstract class BaseController {
  handleException(error: any, res: Response) {
    if (error instanceof ApplicationException) {
      res.status(400);
      res.send(error.message);
    } else {
      throw new Error(error);
    }
  }
}
