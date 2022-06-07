import { IUser } from './domain/user';

export interface IUserRepository {
  all(): Promise<IUser[]>;
  find(id: number): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  save(entry: IUser): Promise<void>;
  update(entry: IUser): Promise<void>;
  remove(id: number): Promise<void>;
}
