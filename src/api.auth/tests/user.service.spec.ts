// Utils
import { Encrypter } from '../common/utils/encrypter';

// Mock DB
import db from '../common/persistence/mock.persistence';

// Mock repository
import { UserMockRepository } from '../repositories/implementation/mock/user.mock.repository';

// Class to be tested
import { UserService } from '../services/user.service';

const userService = new UserService(new UserMockRepository(), new Encrypter());

describe('User Service', () => {
  test('should return "1"', async () => {
    const howManyUsers = await userService.howmany();
    expect(howManyUsers).toBe('1');
  });

  test('should return "Invalid email." error', async () => {
    let errorMsg;

    try {
      const savedUser = await userService.save({
        email: 'email@adress.com',
        password: 'passwordString',
      });
    } catch (error) {
      errorMsg = error;
    }
    expect(errorMsg).toEqual(Error('Invalid email.'));
  });

  test('should save new user', async () => {
    const savedUser = await userService.save({
      email: 'another@email.com',
      password: 'passwordString',
    });
    expect(savedUser).toBe(undefined);
  });

  test('should return "2"', async () => {
    const howManyUsers = await userService.howmany();
    expect(howManyUsers).toBe('2');
  });
});
