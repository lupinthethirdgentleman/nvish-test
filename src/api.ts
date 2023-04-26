import axios from 'axios'
import { User } from './routes/type';

export const getUsers = async () => {
  const res = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users");
  return res?.data.sort((a, b) => a.name.localeCompare(b.name));
}