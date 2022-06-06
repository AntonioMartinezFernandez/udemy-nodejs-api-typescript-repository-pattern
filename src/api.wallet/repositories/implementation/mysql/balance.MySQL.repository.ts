import { IBalance } from '../../domain/balance';
import { IBalanceRepository } from '../../balance.repository';

import { connector } from '../../../common/persistence/mysql.persistence';

export class BalanceMySQLRepository implements IBalanceRepository {
  public async all(): Promise<IBalance[]> {
    const [rows]: any[] = await connector.execute(
      'SELECT * from wallet_balance ORDER BY id DESC',
    );

    return rows as IBalance[];
  }

  public async find(id: number): Promise<IBalance | null> {
    const [rows]: any[] = await connector.execute(
      'SELECT * from wallet_balance WHERE id = ?',
      [id],
    );

    if (rows.length) {
      return rows[0] as IBalance;
    }
    return null;
  }

  public async findByUserId(user_id: number): Promise<IBalance | null> {
    const [rows]: any[] = await connector.execute(
      'SELECT * from wallet_balance WHERE user_id = ? ORDER BY id DESC',
      [user_id],
    );

    if (rows.length) {
      return rows[0] as IBalance;
    }

    return null;
  }

  public async store(entry: IBalance): Promise<void> {
    const now = new Date();
    await connector.execute(
      'INSERT INTO wallet_balance(user_id, amount, created_at) VALUES(?, ?, ?)',
      [entry.user_id, entry.amount, now],
    );
  }

  public async update(entry: IBalance): Promise<void> {
    const now = new Date();
    await connector.execute(
      'UPDATE wallet_balance SET user_id = ?, amount = ?, updated_at = ? WHERE id = ?',
      [entry.user_id, entry.amount, now, entry.id],
    );
  }

  public async remove(id: number): Promise<void> {
    await connector.execute('DELETE FROM wallet_balance WHERE id = ?', [id]);
  }
}
