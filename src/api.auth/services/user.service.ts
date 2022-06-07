import { IUser } from '../repositories/domain/user';
import { IUserCreateDTO, IUserUpdateDTO } from '../dtos/user.dto';
import { IUserRepository } from '../repositories/user.repository';

import { ApplicationException } from '../common/exceptions/application.exception';
import { Encrypter } from '../common/utils/encrypter';

export class UserService {
  constructor(
    private readonly userRepoContainer: IUserRepository,
    private readonly encrypterContainer: Encrypter,
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
    await this.userRepoContainer.remove(id);
  }
}
