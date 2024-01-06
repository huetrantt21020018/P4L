import {EntityApi} from "./entity";
import {UserAddress} from "../../types/user";

export class UserAddressApi extends EntityApi<UserAddress> {
  constructor(t: string) {
    super('UserAddress', t);
  }
}
