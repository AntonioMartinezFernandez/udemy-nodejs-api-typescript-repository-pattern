import { ISubscriptionRepository } from '../../subscription.repository';
import { ISubscription } from '../../domain/subscription';

import {
  connector,
  database,
} from '../../../common/persistence/mongodb.persistence';

import {
  ISubscriptionCreateDto,
  ISubscriptionUpdateDto,
} from 'src/api.wallet/dtos/subscription.dto';

export class SubscriptionMongodbRepository implements ISubscriptionRepository {
  public async all(): Promise<ISubscription[]> {
    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('subscriptions');

    const data = await collection.find({}).toArray();
    await connector.close();

    return data as unknown as ISubscription[];
  }

  public async find(id: number): Promise<ISubscription | null> {
    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('subscriptions');

    const data = await collection.find({ id: id }).toArray();

    await connector.close();

    return data[0] as unknown as ISubscription;
  }

  public async findByUserAndCode(
    user_id: number,
    code: string,
  ): Promise<ISubscription | null> {
    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('subscriptions');

    const data = await collection
      .find({ user_id: user_id, code: code })
      .toArray();

    await connector.close();

    return data[0] as unknown as ISubscription;
  }

  public async store(entry: ISubscriptionCreateDto): Promise<void> {
    const now = new Date();
    const newId = Date.now() | 0;

    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('subscriptions');

    await collection.insertOne({
      id: newId,
      user_id: entry.user_id,
      amount: entry.amount,
      code: entry.code,
      cron: entry.cron,
      created_at: now,
      updated_at: now,
    });

    await connector.close();
  }

  public async update(
    id: number,
    entry: ISubscriptionUpdateDto,
  ): Promise<void> {
    const now = new Date();

    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('subscriptions');

    await collection.updateOne(
      { id: id },
      {
        $set: {
          code: entry.code,
          user_id: entry.user_id,
          amount: entry.amount,
          cron: entry.cron,
          updated_at: now,
        },
      },
    );

    await connector.close();
  }

  public async remove(id: number): Promise<void> {
    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('subscriptions');

    await collection.deleteOne({ id: id });

    await connector.close();
  }
}
