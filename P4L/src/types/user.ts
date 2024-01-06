import { Role } from './role';
import {UserDetail} from "./userDetail";
export default interface User {
    id: number;
    username: string;
    name: string;
    creationTime: string;
    password?: string;

    detail?: UserDetail;
    roles?: Role[];
    userAddress?: UserAddress;
}

export interface UserAddress {
  city: string;
  extra: string;
  id: number;
  phoneNumber: string;
  province: string
  status: number
  street: string
  userId: number
  ward: string
}
