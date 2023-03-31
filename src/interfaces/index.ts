export interface IUser {
  id: number;
  username: string;
  vocation: string;
  level: number;
  password: string;
}

export interface IOrder {
  id: number;
  userId: number;
}

export interface IProducts {
  id: number;
  name: string;
  amount: string;
  orderId: number;
}
