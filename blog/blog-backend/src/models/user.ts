/* eslint-disable no-unused-vars */
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const { Schema } = mongoose;

interface UserDocument extends mongoose.Document {
  username: string;
  hashedPassword: string;

  setPassword(password: string): Promise<void>;
  checkPassword(password: string): Promise<boolean>;
  serialize(): mongoose.LeanDocument<UserDocument>;
  generateToken(): string;
}

interface UserModel extends mongoose.Model<UserDocument> {
  findByUsername(username: string): mongoose.Query<UserDocument, UserDocument>;
}

const UserSchema = new Schema<UserDocument, UserModel>({
  username: String,
  hashedPassword: String,
});

UserSchema.methods.setPassword = async function (
  this: UserDocument,
  password: string,
): Promise<void> {
  this.hashedPassword = await bcrypt.hash(password, 10);
};

UserSchema.methods.checkPassword = async function (
  this: UserDocument,
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.hashedPassword);
};

UserSchema.methods.serialize = function (
  this: UserDocument,
): mongoose.LeanDocument<UserDocument> {
  const data = this.toJSON();
  delete data.hashedPassword;

  return data;
};

UserSchema.methods.generateToken = function (this: UserDocument): string {
  const token = jwt.sign(
    {
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );

  return token;
};

UserSchema.statics.findByUsername = function (
  this: UserModel,
  username: string,
): mongoose.Query<UserDocument, UserDocument> {
  return this.findOne({ username });
};

const User = mongoose.model<UserDocument, UserModel>('User', UserSchema);
export default User;
