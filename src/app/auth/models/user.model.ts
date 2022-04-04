export interface IUser {
  email: string;
  password: string;
  name: string;
  id?: number;
}

export type UserInfo = {
  isAuth: boolean;
  userName: string;
};
