import { Request, Response } from 'express';
import { route, GET, POST } from 'awilix-express';

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

  @route('/save')
  @POST()
  public async save(req: Request, res: Response) {
    try {
      await this.userServiceContainer.save({
        email: req.body.email,
        password: req.body.password,
      });
      res.status(201).send('User created');
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/login')
  @POST()
  public async login(req: Request, res: Response) {
    try {
      const token = await this.userServiceContainer.login({
        email: req.body.email,
        password: req.body.password,
      });

      res.status(200).send(token);
    } catch (error) {
      this.handleException(error, res);
    }
  }
}
