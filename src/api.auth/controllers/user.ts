import { Request, Response } from 'express';
import { route, GET } from 'awilix-express';

import { BaseController } from '../common/controllers/base.controller';

import { UserService } from '../services/user.service';

@route('/user')
export class UserController extends BaseController {
  constructor(private readonly userServiceContainer: UserService) {
    super();
  }

  @route('/howmany')
  @GET()
  public async all(req: Request, res: Response) {
    try {
      res.send(await this.userServiceContainer.howmany());
    } catch (error) {
      this.handleException(error, res);
    }
  }
}
