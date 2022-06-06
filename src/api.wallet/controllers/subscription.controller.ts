import { BaseController } from '../common/controllers/base.controller';
import { Request, Response } from 'express';
import { route, GET, POST, PUT, DELETE } from 'awilix-express';
import { SubscriptionService } from '../services/subscription.service';
import {
  ISubscriptionCreateDto,
  ISubscriptionUpdateDto,
} from '../dtos/subscription.dto';
import { ApplicationException } from '../common/exceptions/application.exception';

@route('/subscriptions')
export class SubscriptionController extends BaseController {
  constructor(
    private readonly subscriptionServiceContainer: SubscriptionService,
  ) {
    super();
  }

  @GET()
  public async allSubscriptions(req: Request, res: Response) {
    try {
      res.send(await this.subscriptionServiceContainer.all());
    } catch (error) {
      return this.handleException(error, res);
    }
  }

  @route('/:id')
  @GET()
  public async subscriptionById(req: Request, res: Response) {
    const sub_id = parseInt(req.params.id);

    try {
      const subscription = await this.subscriptionServiceContainer.find(sub_id);

      if (subscription) {
        res.send(subscription);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      return this.handleException(error, res);
    }
  }

  @route('/store')
  @POST()
  public async store(req: Request, res: Response) {
    const { code, user_id, amount, cron } = req.body;

    if (
      code === undefined ||
      user_id === undefined ||
      amount === undefined ||
      cron === undefined
    ) {
      return this.handleException(
        new ApplicationException('Invalid data'),
        res,
      );
    }

    try {
      await this.subscriptionServiceContainer.store({
        code,
        user_id,
        amount,
        cron,
      } as ISubscriptionCreateDto);

      res.sendStatus(200);
    } catch (error) {
      return this.handleException(error, res);
    }
  }

  @route('/update/:id')
  @PUT()
  public async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const { code, user_id, amount, cron } = req.body;

      await this.subscriptionServiceContainer.update(id, {
        code,
        user_id,
        amount,
        cron,
        updated_at: new Date(),
      } as ISubscriptionUpdateDto);

      res.sendStatus(200);
    } catch (error) {
      return this.handleException(error, res);
    }
  }

  @route('/delete/:id')
  @DELETE()
  public async remote(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      await this.subscriptionServiceContainer.remove(id);

      res.sendStatus(200);
    } catch (error) {
      return this.handleException(error, res);
    }
  }
}
