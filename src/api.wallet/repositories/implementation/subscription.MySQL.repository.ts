import { SubscriptionRepository } from '../subscription.repository';
import { Subscription } from '../domain/subscription';
import { connector } from '../../common/persistence/mysql.persistence';

export class SubscriptionMySQLRepository implements SubscriptionRepository {
  public async all(): Promise<Subscription[]> {
    const [rows] = await connector.execute(
      'SELECT * from wallet_subscription ORDER BY id DESC',
    );

    return rows as Subscription[];
  }

  public async findById(id: Number): Promise<Subscription | null> {
    const [rows]: any[] = await connector.execute(
      'SELECT * from wallet_subscription WHERE id = ?',
      [id],
    );

    if (rows.length) {
      return rows[0] as Subscription;
    }
    return null;
  }

  public async findByUserAndCode(
    user_id: Number,
    code: string,
  ): Promise<Subscription | null> {
    const [rows]: any[] = await connector.execute(
      'SELECT * from wallet_subscription WHERE user_id = ? AND code = ?',
      [user_id, code],
    );

    if (rows.length) {
      return rows[0] as Subscription;
    }
    return null;
  }

  public async store(entry: Subscription): Promise<void> {
    const now = new Date();
    await connector.execute(
      'INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at) VALUES(?, ?, ?, ?, ?)',
      [entry.user_id, entry.code, entry.amount, entry.cron, now],
    );
  }

  public async update(id: Number, entry: Subscription): Promise<void> {
    const now = new Date();
    await connector.execute(
      'UPDATE wallet_subscription SET user_id = ?, code = ?, amount = ?, cron = ?, updated_at = ? WHERE id = ?',
      [entry.user_id, entry.code, entry.amount, entry.cron, now, id],
    );
  }

  public async remove(id: Number): Promise<void> {
    await connector.execute('DELETE FROM wallet_subscription WHERE id = ?', [
      id,
    ]);
  }
}
