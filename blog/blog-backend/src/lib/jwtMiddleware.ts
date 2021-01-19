import * as jwt from 'jsonwebtoken';
import { Next, Middleware, ParameterizedContext } from 'koa';
import { State } from '..';
import User from '../models/user';

export interface IUser {
  _id: string;
  username: string;
}

interface IToken extends IUser {
  iat: number;
  exp: number;
}

const jwtMiddleware: Middleware = async (
  ctx: ParameterizedContext<State>,
  next: Next,
): Promise<void> => {
  const token = ctx.cookies.get('access_token');

  if (!token) {
    return next();
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as IToken;
      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
        const user = await User.findById(decoded._id);
        const token = user.generateToken();

        ctx.cookies.set('access_token', token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });
      }

      ctx.state.user = {
        _id: decoded._id,
        username: decoded.username,
      };
      return next();
    } catch (e) {
      return next();
    }
  }
};

export default jwtMiddleware;
