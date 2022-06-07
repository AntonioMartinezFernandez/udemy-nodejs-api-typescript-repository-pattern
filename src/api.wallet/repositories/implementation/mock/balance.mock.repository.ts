import { IBalance } from '../../domain/balance';
import { IBalanceRepository } from '../../balance.repository';

import db from '../../../common/persistence/mock.persistence';

export class BalanceMockRepository implements IBalanceRepository {
  public async all(): Promise<IBalance[]> {
    const table = db.balance as IBalance[];
    return Object.assign([...table]); //! Break mutability with Object.assign
  }

  public async find(id: number): Promise<IBalance | null> {
    const table = db.balance as IBalance[];

    const result = table.find((e) => e.id === id);

    if (result) {
      return Object.assign({ ...result }); //! Break mutability with Object.assign
    } else {
      return null;
    }
  }

  public async findByUserId(user_id: number): Promise<IBalance | null> {
    const table = db.balance as IBalance[];

    const result = table.find((e) => e.user_id === user_id);

    if (result) {
      return Object.assign({ ...result }); //! Break mutability with Object.assign
    } else {
      return null;
    }
  }

  public async store(entry: IBalance): Promise<void> {
    const table = db.balance as IBalance[];

    const now = new Date();

    db._balanceId++;

    table.push({
      id: db._balanceId,
      user_id: entry.user_id,
      amount: entry.amount,
      created_at: now,
      updated_at: null,
    });
  }

  public async update(entry: IBalance): Promise<void> {
    const table = db.balance as IBalance[];

    const now = new Date();

    const originalEntry = table.find((e) => e.id === entry.id);

    if (originalEntry) {
      originalEntry.user_id = entry.user_id;
      originalEntry.amount = entry.amount;
      originalEntry.updated_at = now;
    }
  }

  public async remove(id: number): Promise<void> {
    const table = db.balance as IBalance[];

    db.balance = table.filter((e) => e.id !== id) as any;
  }
}
