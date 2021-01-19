import { Next, ParameterizedContext } from 'koa';
import { State } from '..';

const checkLoggedIn = (
  ctx: ParameterizedContext<State>,
  next: Next,
): Promise<void> => {
  if (!ctx.state.user) {
    ctx.status = 401;
  } else {
    return next();
  }
};

export default checkLoggedIn;
