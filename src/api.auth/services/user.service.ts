import { IUser } from '../repositories/domain/user';
import {
  IUserCreateDTO,
  IUserLoggedDTO,
  IUserUpdateDTO,
} from '../dtos/user.dto';
import { IUserRepository } from '../repositories/user.repository';

import { ApplicationException } from '../common/exceptions/application.exception';
import { Encrypter } from '../common/utils/encrypter';
import { Jsonwebtoken } from '../common/utils/jsonwebtoken';

export class UserService {
  constructor(
    private readonly userRepoContainer: IUserRepository,
    private readonly encrypterContainer: Encrypter,
    private readonly jwtContainer: Jsonwebtoken,
  ) {}

  public async all(): Promise<IUser[] | null> {
    return await this.userRepoContainer.all();
  }

  public async howmany(): Promise<string | null> {
    let howManyUsers = 0;

    const users = await this.all();
    if (users) {
      howManyUsers = Object.keys(users).length;
    }

    return howManyUsers.toString();
  }

  public async find(id: number): Promise<IUser | null> {
    return await this.userRepoContainer.find(id);
  }

  public async save(entry: IUserCreateDTO): Promise<void> {
    const existUser = await this.userRepoContainer.findByEmail(entry.email);

    if (!existUser) {
      const encryptedPassword = await this.encrypterContainer.encrypt(
        entry.password,
      );

      const newEntry = { email: entry.email, password: encryptedPassword };
      await this.userRepoContainer.save(newEntry as IUser);
    } else {
      throw new ApplicationException('Invalid email.');
    }
  }

  public async update(id: number, entry: IUserUpdateDTO): Promise<void> {
    const originalUser = await this.userRepoContainer.find(id);

    if (originalUser) {
      if (entry.password) {
        entry.password = await this.encrypterContainer.encrypt(entry.password);
      } else {
        entry.password = originalUser.password;
      }

      originalUser.email = entry.email;
      originalUser.password = entry.password;

      await this.userRepoContainer.update(originalUser);
    } else {
      throw new ApplicationException('User doesnt exists.');
    }
  }

  public async remove(id: number): Promise<void> {
    return await this.userRepoContainer.remove(id);
  }

  public async login(user: IUserCreateDTO): Promise<string> {
    let userToLogin;

    try {
      userToLogin = await this.userRepoContainer.findByEmail(user.email);
    } catch (error) {
      throw new ApplicationException('Invalid request.');
    }

    if (!userToLogin) {
      throw new ApplicationException('Invalid email.');
    } else {
      const match = await this.encrypterContainer.match(
        user.password,
        userToLogin.password,
      );

      if (match) {
        const token = await this.jwtContainer.encryptUser({
          id: userToLogin.id,
          email: userToLogin.email,
        } as IUserLoggedDTO);

        return token as string;
      }
    }

    throw new ApplicationException('Invalid request.');
  }
}
