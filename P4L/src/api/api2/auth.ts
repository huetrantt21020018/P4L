import { BaseApi } from './base';
import {ResponseData} from "./response";

export class AuthApi extends BaseApi {
  constructor() {
    super(undefined, 'auth');
  }

  register(user: string, pass: string, name: string, email: string) : Promise<ResponseData<boolean>> {
    let model = {
      "username": user,
      "password": pass,
      "name": name,
      "email": email
    };

    return this.postJson('register', model);
  }

  login(user: string, pass: string) : Promise<ResponseData<{ token: string }>> {
    let model = {
      "username": user,
      "password": pass
    };

    return this.postJson('login', model);
  }
}
