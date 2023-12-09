import { Role } from './role';
export default interface User {
    id: number;
    username: string;
    name: string;
    creationTime: string;

    roles?: Role[];
}
