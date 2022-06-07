import { IUser } from '../../domain/user';
import { IUserRepository } from '../../user.repository';

import { connector } from '../../../common/persistence/mysql.persistence';

export class UserMysqlRepository implements IUserRepository {
  public async all(): Promise<IUser[]> {
    const [rows]: any[] = await connector.execute(
      'SELECT * from auth_user ORDER BY id DESC',
    );

    return rows as IUser[];
  }

  public async find(id: number): Promise<IUser | null> {
    const [rows]: any[] = await connector.execute(
      'SELECT * from auth_user WHERE id = ?',
      [id],
    );

    if (rows.length) {
      return rows[0] as IUser;
    }
    return null;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const [rows]: any[] = await connector.execute(
      'SELECT * from auth_user WHERE email = ?',
      [email],
    );

    if (rows.length) {
      return rows[0] as IUser;
    }
    return null;
  }

  public async save(entry: IUser): Promise<void> {
    const now = new Date();
    const encryptedPassword = entry.password;

    await connector.execute(
      'INSERT INTO auth_user(email, password, created_at) VALUES(?, ?, ?)',
      [entry.email, encryptedPassword, now],
    );
  }

  public async update(entry: IUser): Promise<void> {
    const now = new Date();
    const encryptedPassword = entry.password;

    await connector.execute(
      'UPDATE auth_user SET email = ?, password = ?, updated_at = ? WHERE id = ?',
      [entry.email, encryptedPassword, now, entry.id],
    );
  }

  public async remove(id: number): Promise<void> {
    await connector.execute('DELETE FROM auth_user WHERE id = ?', [id]);
  }
}
