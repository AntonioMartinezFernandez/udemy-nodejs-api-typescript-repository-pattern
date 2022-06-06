export interface ISubscriptionCreateDto {
  code: string;
  user_id: number;
  amount: number;
  cron: string;
}

export interface ISubscriptionUpdateDto {
  code: string;
  user_id: number;
  amount: number;
  cron: string;
  updated_at: Date | null;
}
