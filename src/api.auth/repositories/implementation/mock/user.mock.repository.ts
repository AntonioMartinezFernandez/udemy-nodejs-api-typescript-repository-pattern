import { IUser } from '../../domain/user';
import { IUserRepository } from '../../user.repository';

import db from '../../../common/persistence/mock.persistence';

export class UserMockRepository implements IUserRepository {
  public async all(): Promise<IUser[]> {
    const table = db.user as IUser[];
    return Object.assign([...table]); //! Break mutability with Object.assign
  }

  public async find(id: number): Promise<IUser | null> {
    const table = db.user as IUser[];

    const result = table.find((e) => e.id === id);

    if (result) {
      return Object.assign({ ...result }); //! Break mutability with Object.assign
    } else {
      return null;
    }
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const table = db.user as IUser[];

    const result = table.find((e) => e.email === email);

    if (result) {
      return Object.assign({ ...result }); //! Break mutability with Object.assign
    } else {
      return null;
    }
  }

  public async save(entry: IUser): Promise<void> {
    const table = db.user as IUser[];

    const now = new Date();
    const encryptedPassword = entry.password;

    db._userId++;

    table.push({
      id: db._userId,
      email: entry.email,
      password: encryptedPassword,
      created_at: now,
      updated_at: null,
    });
  }

  public async update(entry: IUser): Promise<void> {
    const table = db.user as IUser[];

    const now = new Date();
    const encryptedPassword = entry.password;

    const originalEntry = table.find((e) => e.id === entry.id);

    if (originalEntry) {
      originalEntry.email = entry.email;
      originalEntry.password = encryptedPassword;
      originalEntry.updated_at = now;
    }
  }

  public async remove(id: number): Promise<void> {
    const table = db.user as IUser[];

    db.user = table.filter((e) => e.id !== id) as any;
  }
}
