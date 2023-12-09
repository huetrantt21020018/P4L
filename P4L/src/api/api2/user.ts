import {BaseApi} from "./base";
import User from "../../types/user";
import {ResponseType} from './response';

export class UserApi extends BaseApi {
  constructor(token: string) {
    super(undefined,  'user', token);
  }

  self() : Promise<ResponseType<User>> {
    return this.getJson('self');
  }
}
