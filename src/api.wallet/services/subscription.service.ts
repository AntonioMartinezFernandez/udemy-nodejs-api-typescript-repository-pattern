import { ApplicationException } from '../common/exceptions/application.exception';

import { ISubscription } from '../repositories/domain/subscription';
import { ISubscriptionRepository } from '../repositories/subscription.repository';

import {
  ISubscriptionCreateDto,
  ISubscriptionUpdateDto,
} from '../dtos/subscription.dto';

export class SubscriptionService {
  constructor(
    private readonly subscriptionRepoContainer: ISubscriptionRepository,
  ) {}

  public async all(): Promise<ISubscription[]> {
    return this.subscriptionRepoContainer.all();
  }

  public async find(id: number): Promise<ISubscription | null> {
    return this.subscriptionRepoContainer.find(id);
  }

  public async store(entry: ISubscriptionCreateDto): Promise<void> {
    const existSubscription =
      await this.subscriptionRepoContainer.findByUserAndCode(
        entry.user_id,
        entry.code,
      );

    if (!existSubscription) {
      await this.subscriptionRepoContainer.store(entry as ISubscription);
    } else {
      throw new ApplicationException('Subscription code already exists.');
    }
  }

  public async update(
    id: number,
    entry: ISubscriptionUpdateDto,
  ): Promise<void> {
    const originalSubscription = await this.subscriptionRepoContainer.find(id);

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
      await this.subscriptionRepoContainer.update(id, originalSubscription);
    } else {
      throw new ApplicationException('Subscription doesnt exists.');
    }
  }

  public async remove(id: number): Promise<void> {
    await this.subscriptionRepoContainer.remove(id);
  }
}
