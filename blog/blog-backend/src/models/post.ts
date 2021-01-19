import * as mongoose from 'mongoose';
import { IUser } from '../lib/jwtMiddleware';

const { Schema } = mongoose;

export interface PostDocument extends mongoose.Document {
  title: string;
  body: string;
  tags: Array<string>;
  publishedDate: Date;
  user: IUser;
}

const PostSchema = new Schema<PostDocument>({
  title: String,
  body: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
});

const Post = mongoose.model<PostDocument>('Post', PostSchema);
export default Post;
