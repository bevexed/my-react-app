import ajax from './ajax'

// const BASE = 'http://localhost:4000'

export const reqRegister = (user) => ajax('/register', user)
export const reqLogin = (username, password) => ajax('/login', {username, password})
