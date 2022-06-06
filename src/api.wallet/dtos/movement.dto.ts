import { MovementType } from '../common/enums/movementType';

export interface MovementCreateDto {
  type: MovementType;
  user_id: number;
  amount: number;
}
