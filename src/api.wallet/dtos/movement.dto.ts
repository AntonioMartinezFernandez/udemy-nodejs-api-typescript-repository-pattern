import { MovementType } from '../common/enums/movementType';

export interface IMovementCreateDto {
  type: MovementType;
  user_id: number;
  amount: number;
}
