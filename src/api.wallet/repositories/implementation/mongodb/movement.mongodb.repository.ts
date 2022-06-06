import { IMovement } from '../../domain/movement';
import { IMovementRepository } from '../../movement.repository';

import {
  connector,
  database,
} from '../../../common/persistence/mongodb.persistence';

export class MovementMongodbRepository implements IMovementRepository {
  public async all(): Promise<IMovement[]> {
    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('movements');

    const data = await collection.find({}).toArray();
    await connector.close();

    return data as unknown as IMovement[];
  }

  public async find(id: number): Promise<IMovement | null> {
    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('movements');

    const data = await collection.find({ id: id }).toArray();

    await connector.close();

    return data[0] as unknown as IMovement;
  }

  public async store(entry: IMovement): Promise<void> {
    const now = new Date();
    const newId = Date.now() | 0;

    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('movements');

    await collection.insertOne({
      id: newId,
      user_id: entry.user_id,
      type: entry.type,
      amount: entry.amount,
      created_at: now,
      updated_at: now,
    });

    await connector.close();
  }

  public async update(entry: IMovement): Promise<void> {
    const now = new Date();

    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('movements');

    await collection.updateOne(
      { id: entry.id },
      {
        $set: {
          user_id: entry.user_id,
          type: entry.type,
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
    const collection = db.collection('movements');

    await collection.deleteOne({ id: id });

    await connector.close();
  }
}
