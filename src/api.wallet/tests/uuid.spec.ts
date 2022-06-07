import { UuidGenerator } from '../common/utils/implementations/uuidGenerator';

describe('UUID Generator', () => {
  test('generate uuid', () => {
    const uuid = new UuidGenerator();
    const firstUuid = uuid.generateUuid();
    const secondUuid = uuid.generateUuid();

    expect(firstUuid.length).toEqual(36);
    expect(secondUuid.length).toEqual(36);
    expect(firstUuid === secondUuid).toBe(false);
  });
});
