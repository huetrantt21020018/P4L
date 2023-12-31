import {UserDetail} from "../../types/userDetail";
import {EntityApi} from "./entity";

export class UserDetailApi extends EntityApi<UserDetail> {
  constructor(token: string) {
    super('UserDetail', token);
  }
}
