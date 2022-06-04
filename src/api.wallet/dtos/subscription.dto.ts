export interface SubscriptionCreateDto {
  code: string;
  user_id: number;
  amount: number;
  cron: string;
}

export interface SubscriptionUpdateDto {
  code: string;
  user_id: number;
  amount: number;
  cron: string;
  updated_at: Date | null;
}
