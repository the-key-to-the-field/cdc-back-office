export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

export interface LoginUser {
  username: string;
  password: string;
}
