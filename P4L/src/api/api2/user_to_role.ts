import {EntityApi} from "./entity";
import {UserToRole} from "../types";
import {ResponseData} from "./response";

export class UserToRoleApi extends EntityApi<UserToRole> {
  constructor(token: string) {
    super('UserToRole', token);
  }

  listByUserId(userId: number): Promise<ResponseData<UserToRole[]>> {
    return this.getJson('ListByUserId/' + userId);
  }
}
