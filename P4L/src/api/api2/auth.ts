import { BaseApi } from './base';
import {ResponseType} from "./response";

export class AuthApi extends BaseApi {
  constructor() {
    super(undefined, 'auth');
  }

  register(user: string, pass: string) : Promise<ResponseType<boolean>> {
    let model = {
      "username": user,
      "password": pass
    };

    return this.postJson('register', model);
  }

  login(user: string, pass: string) : Promise<ResponseType<{ token: string }>> {
    let model = {
      "username": user,
      "password": pass
    };

    return this.postJson('login', model);
  }
}
