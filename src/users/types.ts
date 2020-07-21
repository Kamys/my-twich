export type User = {
  id: string
  username: string
  password: string
}

export type UserCreateParam = Pick<User, 'username' | 'password'>

export type UserView = Omit<User, 'password'>