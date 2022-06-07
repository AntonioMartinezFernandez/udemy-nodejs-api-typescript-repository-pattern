import { IUser } from '../../domain/user';
import { IUserRepository } from '../../user.repository';

import {
  connector,
  database,
} from '../../../common/persistence/mongodb.persistence';

export class UserMongodbRepository implements IUserRepository {
  public async all(): Promise<IUser[]> {
    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('users');

    const data = await collection.find({}).toArray();
    await connector.close();

    return data as unknown as IUser[];
  }

  public async find(id: number): Promise<IUser | null> {
    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('users');

    const data = await collection.find({ id: id }).toArray();
    await connector.close();

    return data[0] as unknown as IUser;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('users');

    const data = await collection.find({ email: email }).toArray();
    await connector.close();

    return data[0] as unknown as IUser;
  }

  public async save(entry: IUser): Promise<void> {
    const now = new Date();
    const newId = Date.now() | 0;
    const encryptedPassword = entry.password;

    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('users');

    await collection.insertOne({
      id: newId,
      email: entry.email,
      password: encryptedPassword,
      created_at: now,
      updated_at: null,
    });

    await connector.close();
  }

  public async update(entry: IUser): Promise<void> {
    const now = new Date();
    const encryptedPassword = entry.password;

    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('users');

    await collection.updateOne(
      { id: entry.id },
      {
        $set: {
          email: entry.email,
          password: encryptedPassword,
          updated_at: now,
        },
      },
    );

    await connector.close();
  }

  public async remove(id: number): Promise<void> {
    await connector.connect();

    const db = connector.db(database);
    const collection = db.collection('users');

    await collection.deleteOne({ id: id });

    await connector.close();
  }
}
