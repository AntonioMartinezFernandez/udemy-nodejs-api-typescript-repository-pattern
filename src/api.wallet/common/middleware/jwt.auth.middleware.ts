import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export class jwtAuth {
  check(req: Request, res: Response, next: NextFunction) {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      res.sendStatus(401);
    } else {
      const decodedToken = jwt.verify(
        token as string,
        process.env.SECRET_KEY as string,
      ) as Record<string, any>;

      req.body.auth = decodedToken.data.user;

      next();
    }
  }
}
