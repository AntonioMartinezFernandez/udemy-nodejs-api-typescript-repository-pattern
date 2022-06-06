import { IBalance } from '../../domain/balance';
import { IBalanceRepository } from '../../balance.repository';

import {
  connector,
  database,
} from '../../../common/persistence/mongodb.persistence';

export class BalanceMongodbRepository implements IBalanceRepository {
  public async all(): Promise<IBalance[]> {
    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('balances');

    const data = await collection.find({}).toArray();
    await connector.close();

    return data as unknown as IBalance[];
  }

  public async find(id: number): Promise<IBalance | null> {
    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('balances');

    const data = await collection.find({ id: id }).toArray();
    await connector.close();

    return data[0] as unknown as IBalance;
  }

  public async findByUserId(user_id: number): Promise<IBalance | null> {
    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('balances');

    const data = await collection.find({ user_id: user_id }).toArray();
    await connector.close();

    if (data.length) {
      return data[0] as unknown as IBalance;
    }

    return null;
  }

  public async store(entry: IBalance): Promise<void> {
    const now = new Date();
    const newId = Date.now() | 0;

    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('balances');

    await collection.insertOne({
      id: newId,
      user_id: entry.user_id,
      amount: entry.amount,
      created_at: now,
      updated_at: now,
    });

    await connector.close();
  }

  public async update(entry: IBalance): Promise<void> {
    const now = new Date();

    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('balances');

    await collection.updateOne(
      { id: entry.id },
      {
        $set: {
          user_id: entry.user_id,
          amount: entry.amount,
          updated_at: now,
        },
      },
    );

    await connector.close();
  }

  public async remove(id: number): Promise<void> {
    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('balances');

    await collection.deleteOne({ id: id });

    await connector.close();
  }
}
