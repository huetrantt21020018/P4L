import {Role} from "../types";
import {EntityApi} from "./entity";

export class RoleApi extends EntityApi<Role> {
  constructor(token: string) {
    super('Role', token);
  }
}
