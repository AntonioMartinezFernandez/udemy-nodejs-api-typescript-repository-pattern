import { IBalance } from './domain/balance';

export interface IBalanceRepository {
  all(): Promise<IBalance[]>;
  find(id: number): Promise<IBalance | null>;
  findByUserId(user_id: number): Promise<IBalance | null>;
  store(entry: IBalance): Promise<void>;
  update(entry: IBalance): Promise<void>;
  remove(id: number): Promise<void>;
}
