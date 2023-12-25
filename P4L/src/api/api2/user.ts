import {BaseApi} from "./base";
import User from "../../types/user";
import {ResponseData} from './response';

export class UserApi extends BaseApi {
  constructor(token: string) {
    super(undefined,  'user', token);
  }

  self() : Promise<ResponseData<User>> {
    return this.getJson('self');
  }
}
