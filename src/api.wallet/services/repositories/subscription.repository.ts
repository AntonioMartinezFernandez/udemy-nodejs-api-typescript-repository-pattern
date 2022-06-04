import {
  SubscriptionCreateDto,
  SubscriptionUpdateDto,
} from 'src/api.wallet/dtos/subscription.dto';
import { Subscription } from './domain/subscription';

export interface SubscriptionRepository {
  all(): Promise<Subscription[]>;
  findById(id: Number): Promise<Subscription | null>;
  findByUserAndCode(
    user_id: Number,
    code: string,
  ): Promise<Subscription | null>;
  store(entry: SubscriptionCreateDto): Promise<void>;
  update(id: Number, entry: SubscriptionUpdateDto): Promise<void>;
  remove(id: Number): Promise<void>;
}
