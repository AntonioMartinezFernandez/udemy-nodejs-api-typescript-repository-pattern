// Mock Repository
import { MovementMockRepository } from '../repositories/implementation/mock/movement.mock.repository';
import { BalanceMockRepository } from '../repositories/implementation/mock/balance.mock.repository';

// Interfaces
import { IMovement } from '../repositories/domain/movement';
import { IMovementCreateDto } from '../dtos/movement.dto';

// Class to be tested
import { MovementService } from '../services/movement.service';

const movementService = new MovementService(
  new MovementMockRepository(),
  new BalanceMockRepository(),
);

// Mock DB
import db from '../common/persistence/mock.persistence';

// Tests
describe('Movement Service', () => {
  test('balance of user 1 should be 20', async () => {
    expect(db.balance[0].amount).toEqual(20);
  });

  test('should insert one income movement of 100 for user 1', async () => {
    await movementService.store({
      type: 0,
      user_id: 1,
      amount: 100,
    } as IMovementCreateDto);

    expect(db.movement.length).toEqual(1);
  });

  test('should find the first movement in database and return amount 100', async () => {
    const movements = (await movementService.all()) as IMovement[];
    const firstMovement = (await movementService.find(1)) as IMovement;

    expect(firstMovement.amount).toBe(100);
    expect(movements[0].amount).toBe(100);
  });

  test('should insert one outcome movement of 50 for user 1', async () => {
    await movementService.store({
      type: 1,
      user_id: 1,
      amount: 50,
    } as IMovementCreateDto);

    expect(db.movement.length).toBe(2);
  });

  test('balance of user 1 must be 70', async () => {
    (await movementService.all()) as IMovement[];

    expect(db.balance[0].amount).toBe(70);
  });

  test('should try to insert one outcome movement of 80 for user 1 and fail', async () => {
    let errorMsg;

    try {
      await movementService.store({
        type: 1,
        user_id: 1,
        amount: 80,
      } as IMovementCreateDto);
    } catch (error) {
      errorMsg = error;
    }

    expect(db.movement.length).toEqual(2);
    expect(db.balance[0].amount).toEqual(70);
    expect(errorMsg).toEqual(Error('User balance amount is not enough'));
  });

  test('should try to insert one invalid movement for user 1 and fail', async () => {
    let errorMsg;

    try {
      await movementService.store({
        type: 2,
        user_id: 1,
        amount: 10,
      });
    } catch (error) {
      errorMsg = error;
    }

    expect(db.movement.length).toEqual(2);
    expect(db.balance[0].amount).toEqual(70);
    expect(errorMsg).toEqual(Error('Invalid movement type'));
  });
});
