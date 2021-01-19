import * as dotenv from 'dotenv';
dotenv.config();

import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as mongoose from 'mongoose';
import api from './api';
import jwtMiddleware, { IUser } from './lib/jwtMiddleware';
import { PostDocument } from './models/post';

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

export interface State {
  user: IUser;
  post: PostDocument;
}

const app = new Koa<State>();
const router = new Router<string>();

router.use('/api', api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);

app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;

app.listen(port, () => {
  console.log('Listening to port %d', port);
});
