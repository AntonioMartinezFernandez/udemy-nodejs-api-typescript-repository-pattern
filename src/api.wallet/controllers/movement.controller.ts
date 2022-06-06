import { BaseController } from '../common/controllers/base.controller';
import { Request, Response } from 'express';
import { route, GET, POST } from 'awilix-express';
import { MovementService } from '../services/movement.service';
import { MovementCreateDto } from '../dtos/movement.dto';
import { ApplicationException } from '../common/exceptions/application.exception';

@route('/movements')
export class MovementController extends BaseController {
  constructor(private readonly movementServiceContainer: MovementService) {
    super();
  }

  @GET()
  public async all(req: Request, res: Response) {
    try {
      res.send(await this.movementServiceContainer.all());
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/:id')
  @GET()
  public async find(req: Request, res: Response) {
    const movement_id = parseInt(req.params.id);

    try {
      const movement = await this.movementServiceContainer.find(movement_id);

      if (movement) {
        res.send(movement);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/store')
  @POST()
  public async store(req: Request, res: Response) {
    const { user_id, amount, type } = req.body;

    if (user_id === undefined || amount === undefined || type === undefined) {
      return this.handleException(
        new ApplicationException('Invalid data'),
        res,
      );
    }

    try {
      const serviceResponse = await this.movementServiceContainer.store({
        type: type,
        user_id: user_id,
        amount: amount,
      } as MovementCreateDto);

      res.sendStatus(200);
    } catch (error) {
      return this.handleException(error, res);
    }
  }
}
