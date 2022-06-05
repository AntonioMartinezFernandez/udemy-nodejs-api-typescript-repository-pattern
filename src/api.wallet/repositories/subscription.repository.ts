import {
  SubscriptionCreateDto,
  SubscriptionUpdateDto,
} from 'src/api.wallet/dtos/subscription.dto';
import { Subscription } from './domain/subscription';

export interface SubscriptionRepository {
  all(): Promise<Subscription[]>;
  find(id: number): Promise<Subscription | null>;
  findByUserAndCode(
    user_id: number,
    code: string,
  ): Promise<Subscription | null>;
  store(entry: SubscriptionCreateDto): Promise<void>;
  update(id: number, entry: SubscriptionUpdateDto): Promise<void>;
  remove(id: number): Promise<void>;
}
