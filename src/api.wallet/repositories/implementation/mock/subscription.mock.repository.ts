import { ISubscription } from '../../domain/subscription';
import { ISubscriptionRepository } from '../../subscription.repository';

import {
  ISubscriptionCreateDto,
  ISubscriptionUpdateDto,
} from 'src/api.wallet/dtos/subscription.dto';

import db from '../../../common/persistence/mock.persistence';

export class SubscriptionMockRepository implements ISubscriptionRepository {
  public async all(): Promise<ISubscription[]> {
    const table = db.subscription as ISubscription[];
    return Object.assign([...table]); //! Break mutability with Object.assign
  }

  public async find(id: number): Promise<ISubscription | null> {
    const table = db.subscription as ISubscription[];

    const result = table.find((e) => e.id === id);

    if (result) {
      return Object.assign({ ...result }); //! Break mutability with Object.assign
    } else {
      return null;
    }
  }

  public async findByUserAndCode(
    user_id: number,
    code: string,
  ): Promise<ISubscription | null> {
    const table = db.subscription as ISubscription[];

    const result = table.find((e) => e.user_id === user_id && e.code === code);

    if (result) {
      return Object.assign({ ...result }); //! Break mutability with Object.assign
    } else {
      return null;
    }
  }

  public async store(entry: ISubscriptionCreateDto): Promise<void> {
    const table = db.subscription as ISubscription[];

    const now = new Date();

    db._subscriptionId++;

    table.push({
      id: db._subscriptionId,
      code: entry.code,
      user_id: entry.user_id,
      amount: entry.amount,
      cron: entry.cron,
      created_at: now,
      updated_at: null,
    });
  }

  public async update(
    id: number,
    entry: ISubscriptionUpdateDto,
  ): Promise<void> {
    const table = db.subscription as ISubscription[];

    const now = new Date();

    const originalEntry = table.find((e) => e.id === id);

    if (originalEntry) {
      originalEntry.code = entry.code;
      originalEntry.user_id = entry.user_id;
      originalEntry.amount = entry.amount;
      originalEntry.cron = entry.cron;
      originalEntry.updated_at = now;
    }
  }

  public async remove(id: number): Promise<void> {
    const table = db.subscription as ISubscription[];

    db.subscription = table.filter((e) => e.id !== id) as any;
  }
}
