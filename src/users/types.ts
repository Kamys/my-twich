export interface IUser {
  id: string
  username: string
  password: string
}

export type UserCreateParam = Pick<IUser, 'username' | 'password'>

export type UserView = Omit<IUser, 'password'>