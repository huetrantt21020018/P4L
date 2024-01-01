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
}
