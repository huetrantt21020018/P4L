import User from "../../types/user";
import {ResponseData} from './response';
import {EntityApi} from "./entity";

export class UserApi extends EntityApi<User> {
  constructor(token: string) {
    super('user', token);
  }

  self() : Promise<ResponseData<User>> {
    return this.getJson('self');
  }

  setRole(id: number, tagIds: number[]) : Promise<ResponseData<boolean>> {
    return this.putJson('SetRole/' + id, tagIds);
  }
}
