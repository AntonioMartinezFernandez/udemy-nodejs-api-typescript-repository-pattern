import { MovementType } from 'src/api.wallet/common/enums/movementType';

export interface IMovement {
  id: number;
  user_id: number;
  type: MovementType;
  amount: number;
  created_at: Date | null;
  update_at: Date | null;
}
