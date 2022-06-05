import { ApplicationException } from '../common/exceptions/application.exception';
import { Subscription } from '../repositories/domain/subscription';
import { SubscriptionRepository } from '../repositories/subscription.repository';
import {
  SubscriptionCreateDto,
  SubscriptionUpdateDto,
} from '../dtos/subscription.dto';

export class SubscriptionService {
  constructor(
    private readonly subscriptionRepoContainer: SubscriptionRepository,
  ) {}
  public async all(): Promise<Subscription[]> {
    return this.subscriptionRepoContainer.all();
  }

  public async find(id: Number): Promise<Subscription | null> {
    return this.subscriptionRepoContainer.findById(id);
  }

  public async store(entry: SubscriptionCreateDto): Promise<void> {
    const existSubscription =
      await this.subscriptionRepoContainer.findByUserAndCode(
        entry.user_id,
        entry.code,
      );

    if (!existSubscription) {
      await this.subscriptionRepoContainer.store(entry as Subscription);
    } else {
      throw new ApplicationException('Subscription code already exists.');
    }
  }

  public async update(id: Number, entry: SubscriptionUpdateDto): Promise<void> {
    const originalSubscription = await this.subscriptionRepoContainer.findById(
      id,
    );

    const existSubscription =
      await this.subscriptionRepoContainer.findByUserAndCode(
        entry.user_id,
        entry.code,
      );

    if (existSubscription && existSubscription.id !== id) {
      throw new ApplicationException('Subscription code already exists.');
    }

    if (originalSubscription) {
      originalSubscription.code = entry.code;
      originalSubscription.amount = entry.amount;
      originalSubscription.cron = entry.cron;
      this.subscriptionRepoContainer.update(id, originalSubscription);
    } else {
      throw new ApplicationException('Subscription doesnt exists.');
    }
  }

  public async remove(id: Number): Promise<void> {
    return this.subscriptionRepoContainer.remove(id);
  }
}
