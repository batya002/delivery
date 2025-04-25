export interface Register {
    name: string,
    email: string,
    password: string
};
export interface ILogIn {
    name: string,
    password: string
};
export interface Product {
    category: string,
    title: string,
    price: number,
    imgUrl: string
};
export interface LogInStore {
    isLoggedIn: boolean,
    setIsLoggedIn: Function
};