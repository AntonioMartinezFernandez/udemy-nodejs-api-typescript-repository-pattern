import { ApplicationException } from '../common/exceptions/application.exception';

import { BalanceRepository } from '../repositories/balance.repository';
import { MovementRepository } from '../repositories/movement.repository';
import { Movement } from '../repositories/domain/movement';
import { Balance } from '../repositories/domain/balance';

import { MovementCreateDto } from '../dtos/movement.dto';
import { MovementType } from '../common/enums/movementType';

export class MovementService {
  constructor(
    private readonly movementRepoContainer: MovementRepository,
    private readonly balanceRepoContainer: BalanceRepository,
  ) {}

  public async all(): Promise<Movement[] | null> {
    return await this.movementRepoContainer.all();
  }

  public async find(id: number): Promise<Movement | null> {
    return await this.movementRepoContainer.find(id);
  }

  public async store(entry: MovementCreateDto) {
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
    entry: MovementCreateDto,
    balance: Balance | null,
  ) {
    if (!balance) {
      await this.balanceRepoContainer.store({
        user_id: entry.user_id,
        amount: entry.amount,
      } as Balance);
    } else {
      balance.amount += entry.amount;
      await this.balanceRepoContainer.update(balance);
    }

    await this.movementRepoContainer.store(entry as Movement);
  }

  public async outcomeMovement(
    entry: MovementCreateDto,
    balance: Balance | null,
  ) {
    if (!balance || balance.amount < entry.amount) {
      throw new ApplicationException('User balance amount is not enough');
    } else {
      balance.amount -= entry.amount;

      await this.balanceRepoContainer.update(balance);

      await this.movementRepoContainer.store(entry as Movement);
    }
  }
}
