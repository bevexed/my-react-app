import ajax from './ajax'

// const BASE = 'http://localhost:5000'

export const reqRegister = (user) => ajax('/register', user);
export const reqLogin = ({username, password}) => ajax('/login', {username, password});
export const updateUser = (user) => ajax('/update', user);
export const getUser = () => ajax('/user', {}, "GET");
export const reqUserList = (type) => ajax('/userlist', {type}, "GET");
