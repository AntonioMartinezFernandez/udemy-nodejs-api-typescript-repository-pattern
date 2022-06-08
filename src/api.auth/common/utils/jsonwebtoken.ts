import jwt from 'jsonwebtoken';
import { IUserLoggedDTO } from 'src/api.auth/dtos/user.dto';

export class Jsonwebtoken {
  public async encryptUser(dataToEncrypt: IUserLoggedDTO) {
    const secretKey = process.env.SECRET_KEY || 'mySecretKey'; //! Assigned an alternative secret key for testing

    const token = jwt.sign(
      {
        data: { user: dataToEncrypt },
      },
      secretKey,
      { expiresIn: '1h' },
    );

    return token;
  }
}
