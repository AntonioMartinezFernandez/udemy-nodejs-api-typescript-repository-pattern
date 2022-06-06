import { ISubscriptionRepository } from '../../subscription.repository';
import { ISubscription } from '../../domain/subscription';

import { connector } from '../../../common/persistence/mysql.persistence';

export class SubscriptionMySQLRepository implements ISubscriptionRepository {
  public async all(): Promise<ISubscription[]> {
    const [rows]: any[] = await connector.execute(
      'SELECT * from wallet_subscription ORDER BY id DESC',
    );

    return rows as ISubscription[];
  }

  public async find(id: number): Promise<ISubscription | null> {
    const [rows]: any[] = await connector.execute(
      'SELECT * from wallet_subscription WHERE id = ?',
      [id],
    );

    if (rows.length) {
      return rows[0] as ISubscription;
    }
    return null;
  }

  public async findByUserAndCode(
    user_id: number,
    code: string,
  ): Promise<ISubscription | null> {
    const [rows]: any[] = await connector.execute(
      'SELECT * from wallet_subscription WHERE user_id = ? AND code = ?',
      [user_id, code],
    );

    if (rows.length) {
      return rows[0] as ISubscription;
    }
    return null;
  }

  public async store(entry: ISubscription): Promise<void> {
    const now = new Date();
    await connector.execute(
      'INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at) VALUES(?, ?, ?, ?, ?)',
      [entry.user_id, entry.code, entry.amount, entry.cron, now],
    );
  }

  public async update(id: number, entry: ISubscription): Promise<void> {
    const now = new Date();
    await connector.execute(
      'UPDATE wallet_subscription SET user_id = ?, code = ?, amount = ?, cron = ?, updated_at = ? WHERE id = ?',
      [entry.user_id, entry.code, entry.amount, entry.cron, now, id],
    );
  }

  public async remove(id: number): Promise<void> {
    await connector.execute('DELETE FROM wallet_subscription WHERE id = ?', [
      id,
    ]);
  }
}
