import { Context, Next, ParameterizedContext } from 'koa';
import Post from '../../models/post';
import * as mongoose from 'mongoose';
import * as Joi from '@hapi/joi';
import { State } from '../..';

const { ObjectId } = mongoose.Types;

interface BodyWrite {
  title: string;
  body: string;
  tags: Array<string>;
}

interface ParamsId {
  id: string;
}

interface ListQuery {
  tag: string;
  username: string;
}

export const getPostById = async (
  ctx: ParameterizedContext<State>,
  next: Next,
): Promise<void> => {
  const { id }: ParamsId = ctx.params;

  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
  } else {
    try {
      const post = await Post.findById(id);

      if (!post) {
        ctx.status = 404;
      } else {
        ctx.state.post = post;
        return next();
      }
    } catch (e) {
      ctx.throw(500, e);
    }
  }
};

export const checkOwnPost = (
  ctx: ParameterizedContext<State>,
  next: Next,
): Promise<void> => {
  const { user, post } = ctx.state;

  if (post.user._id !== user._id) {
    ctx.status = 403;
  } else {
    return next();
  }
};

export const write = async (
  ctx: ParameterizedContext<State>,
): Promise<void> => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });
  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
  } else {
    const { title, body, tags }: BodyWrite = ctx.request.body;
    const post = new Post({
      title,
      body,
      tags,
      user: ctx.state.user,
    });

    try {
      await post.save();
      ctx.body = post;
    } catch (e) {
      ctx.throw(500, e);
    }
  }
};

export const list = async (ctx: Context): Promise<void> => {
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
  } else {
    const { tag, username }: ListQuery = ctx.query;
    const query = {
      ...(username ? { 'user.username': username } : {}),
      ...(tag ? { tags: tag } : {}),
    };

    try {
      const posts = await Post.find(query)
        .sort({ _id: -1 })
        .limit(10)
        .skip((page - 1) * 10)
        .lean()
        .exec();
      const postCount = await Post.countDocuments(query).exec();

      ctx.set('Last-Page', Math.ceil(postCount / 10).toString());
      ctx.body = posts.map((post) => {
        return {
          ...post,
          body:
            post.body.length < 200
              ? post.body
              : `${post.body.slice(0, 200)}...`,
        };
      });
    } catch (e) {
      ctx.throw(500, e);
    }
  }
};

export const read = async (ctx: ParameterizedContext<State>): Promise<void> => {
  ctx.body = ctx.state.post;
};

export const remove = async (ctx: Context): Promise<void> => {
  const { id }: ParamsId = ctx.params;

  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const update = async (ctx: Context): Promise<void> => {
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });
  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
  } else {
    const { id }: ParamsId = ctx.params;

    try {
      const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
        new: true,
      }).exec();

      if (!post) {
        ctx.status = 404;
      } else {
        ctx.body = post;
      }
    } catch (e) {
      ctx.throw(500, e);
    }
  }
};
