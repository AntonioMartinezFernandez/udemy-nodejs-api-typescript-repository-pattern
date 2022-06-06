import { v4 as uuidv4 } from 'uuid';
import { IUuidGenerator } from '../interfaces/IUuidGenerator';

export class UuidGenerator implements IUuidGenerator {
  generateUuid(): string {
    return uuidv4();
  }
}
