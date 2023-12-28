import {EntityApi} from "./entity";
import {Tag} from "../types";

export class ProductTagApi extends EntityApi<Tag> {
  constructor(token: string) {
    super('ProductTag', token);
  }
}
