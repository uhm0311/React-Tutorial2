import * as Joi from '@hapi/joi';
import { Context, ParameterizedContext } from 'koa';
import { State } from '../..';
import User from '../../models/user';

interface IUser {
  username: string;
  password: string;
}

export const register = async (ctx: Context): Promise<void> => {
  const Schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });
  const result = Schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
  } else {
    const { username, password }: IUser = ctx.request.body;

    try {
      const exists = await User.findByUsername(username);

      if (exists) {
        ctx.status = 409;
      } else {
        const user = new User({
          username,
        });

        await user.setPassword(password);
        await user.save();

        const token = user.generateToken();

        ctx.body = user.serialize();
        ctx.cookies.set('access_token', token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });
      }
    } catch (e) {
      ctx.throw(500, e);
    }
  }
};

export const login = async (ctx: Context): Promise<void> => {
  const { username, password }: IUser = ctx.request.body;

  if (!username || !password) {
    ctx.status = 401;
  } else {
    try {
      const user = await User.findByUsername(username);

      if (!user) {
        ctx.status = 401;
      } else {
        const valid = await user.checkPassword(password);

        if (!valid) {
          ctx.status = 401;
        } else {
          const token = user.generateToken();

          ctx.body = user.serialize();
          ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
          });
        }
      }
    } catch (e) {
      ctx.throw(500, e);
    }
  }
};

export const check = async (
  ctx: ParameterizedContext<State>,
): Promise<void> => {
  const { user } = ctx.state;

  if (!user) {
    ctx.status = 401;
  } else {
    ctx.body = user;
  }
};

export const logout = async (ctx: Context): Promise<void> => {
  ctx.cookies.set('access_token');
  ctx.status = 204;
};
