import { ApplicationException } from '../common/exceptions/application.exception';

import { IBalanceRepository } from '../repositories/balance.repository';
import { IMovementRepository } from '../repositories/movement.repository';
import { IMovement } from '../repositories/domain/movement';
import { IBalance } from '../repositories/domain/balance';

import { IMovementCreateDto } from '../dtos/movement.dto';
import { MovementType } from '../common/enums/movementType';

export class MovementService {
  constructor(
    private readonly movementRepoContainer: IMovementRepository,
    private readonly balanceRepoContainer: IBalanceRepository,
  ) {}

  public async all(): Promise<IMovement[] | null> {
    return await this.movementRepoContainer.all();
  }

  public async find(id: number): Promise<IMovement | null> {
    return await this.movementRepoContainer.find(id);
  }

  public async store(entry: IMovementCreateDto) {
    const actualBalance = await this.balanceRepoContainer.findByUserId(
      entry.user_id,
    );

    if (entry.type === MovementType.income) {
      //* Income logic
      await this.incomeMovement(entry, actualBalance);
    } else if (entry.type === MovementType.outcome) {
      //* Outcome logic
      await this.outcomeMovement(entry, actualBalance);
    } else {
      //! Error logic
      throw new ApplicationException('Invalid movement type');
    }
  }

  public async incomeMovement(
    entry: IMovementCreateDto,
    balance: IBalance | null,
  ) {
    if (!balance) {
      await this.balanceRepoContainer.store({
        user_id: entry.user_id,
        amount: entry.amount,
      } as IBalance);
    } else {
      balance.amount += entry.amount;
      await this.balanceRepoContainer.update(balance);
    }

    await this.movementRepoContainer.store(entry as IMovement);
  }

  public async outcomeMovement(
    entry: IMovementCreateDto,
    balance: IBalance | null,
  ) {
    if (!balance || balance.amount < entry.amount) {
      throw new ApplicationException('User balance amount is not enough');
    } else {
      balance.amount -= entry.amount;

      await this.balanceRepoContainer.update(balance);

      await this.movementRepoContainer.store(entry as IMovement);
    }
  }
}
