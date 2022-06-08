// Utils
import { Encrypter } from '../common/utils/encrypter';
import { Jsonwebtoken } from '../common/utils/jsonwebtoken';

// Mock DB
import db from '../common/persistence/mock.persistence';

// Mock repository
import { UserMockRepository } from '../repositories/implementation/mock/user.mock.repository';

// Class to be tested
import { UserService } from '../services/user.service';

const userService = new UserService(
  new UserMockRepository(),
  new Encrypter(),
  new Jsonwebtoken(),
);

describe('User Service', () => {
  test('should return "1"', async () => {
    const howManyUsers = await userService.howmany();
    expect(howManyUsers).toBe('1');
  });

  test('should return "Invalid email." error', async () => {
    let errorMsg;

    try {
      const savedUser = await userService.save({
        email: 'antonio@weffective.com',
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

  test('should return "Invalid email." error', async () => {
    let errorMsg;

    try {
      await userService.login({
        email: 'random@email.com',
        password: 'randomPassword',
      });
    } catch (error) {
      errorMsg = error;
    }
    expect(errorMsg).toEqual(Error('Invalid email.'));
  });

  test('should return "Invalid request." error', async () => {
    let errorMsg;

    try {
      await userService.login({
        email: 'antonio@weffective.com',
        password: 'randomPassword',
      });
    } catch (error) {
      errorMsg = error;
    }
    expect(errorMsg).toEqual(Error('Invalid request.'));
  });

  test('should return JWT string', async () => {
    let token;

    try {
      token = await userService.login({
        email: 'antonio@weffective.com',
        password: '123456',
      });
    } catch (error) {
      const errorMsg = error;
    }
    expect(token).toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
  });
});
