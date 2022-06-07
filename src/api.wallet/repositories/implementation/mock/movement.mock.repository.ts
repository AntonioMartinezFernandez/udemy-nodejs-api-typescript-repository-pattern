import { IMovement } from '../../domain/movement';
import { IMovementRepository } from '../../movement.repository';

import db from '../../../common/persistence/mock.persistence';

export class MovementMockRepository implements IMovementRepository {
  public async all(): Promise<IMovement[]> {
    const table = db.movement as IMovement[];
    return Object.assign([...table]); //! Break mutability with Object.assign
  }

  public async find(id: number): Promise<IMovement | null> {
    const table = db.movement as IMovement[];

    const result = table.find((e) => e.id === id);

    if (result) {
      return Object.assign({ ...result }); //! Break mutability with Object.assign
    } else {
      return null;
    }
  }

  public async store(entry: IMovement): Promise<void> {
    const table = db.movement as IMovement[];

    const now = new Date();

    db._movementId++;

    table.push({
      id: db._movementId,
      user_id: entry.user_id,
      type: entry.type,
      amount: entry.amount,
      created_at: now,
      updated_at: null,
    });
  }

  public async update(entry: IMovement): Promise<void> {
    const table = db.movement as IMovement[];

    const now = new Date();

    const originalEntry = table.find((e) => e.id === entry.id);

    if (originalEntry) {
      originalEntry.user_id = entry.user_id;
      originalEntry.type = entry.type;
      originalEntry.amount = entry.amount;
      originalEntry.updated_at = now;
    }
  }

  public async remove(id: number): Promise<void> {
    const table = db.movement as IMovement[];

    db.movement = table.filter((e) => e.id !== id) as any;
  }
}
