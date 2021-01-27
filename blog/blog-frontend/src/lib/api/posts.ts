import { AuthResponse } from './auth';
import client from './client';
import qs from 'qs';

export interface PostRequest {
  title: string;
  body: string;
  tags: Array<string>;
}

export interface PostResponse extends PostRequest {
  _id: string;
  user: AuthResponse;
  publishedDate: Date;
}

export interface ListRequest {
  page: string;
  username: string;
  tag: string;
}

export const writePost = ({ title, body, tags }: PostRequest) =>
  client.post<PostResponse>('/api/posts', { title, body, tags });

export const readPost = (id: string) =>
  client.get<PostResponse>(`/api/posts/${id}`);

export const listPosts = ({ page, username, tag }: ListRequest) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });

  return client.get<Array<PostResponse>>(`/api/posts?${queryString}`);
};
