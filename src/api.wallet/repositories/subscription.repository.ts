import {
  ISubscriptionCreateDto,
  ISubscriptionUpdateDto,
} from 'src/api.wallet/dtos/subscription.dto';
import { ISubscription } from './domain/subscription';

export interface ISubscriptionRepository {
  all(): Promise<ISubscription[]>;
  find(id: number): Promise<ISubscription | null>;
  findByUserAndCode(
    user_id: number,
    code: string,
  ): Promise<ISubscription | null>;
  store(entry: ISubscriptionCreateDto): Promise<void>;
  update(id: number, entry: ISubscriptionUpdateDto): Promise<void>;
  remove(id: number): Promise<void>;
}
