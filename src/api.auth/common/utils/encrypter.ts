import bcrypt from 'bcrypt';

export class Encrypter {
  public async encrypt(password: string): Promise<string> {
    const gensalt = parseInt(process.env.BCRYPT_GENSALT as string);
    const salt = await bcrypt.genSalt(gensalt);
    const encryptedPassword = await bcrypt.hash(password, salt);

    return encryptedPassword;
  }

  public async match(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, encryptedPassword);
  }
}
