import axios from "axios";
import { Post } from "../modules/post";
import { User } from "../modules/users";

export const getPost = (id: number) =>
  axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);

export const getUsers = () =>
  axios.get<Array<User>>("https://jsonplaceholder.typicode.com/users");
