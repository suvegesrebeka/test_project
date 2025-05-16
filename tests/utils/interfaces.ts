import user from '../fixtures/user.json'

export interface User {
    email: string,
    password: string
}

export const invalidUser: User = user.invalidUser
export const validUser: User = user.validUser