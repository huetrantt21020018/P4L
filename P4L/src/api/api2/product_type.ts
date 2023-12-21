import {EntityApi} from "./entity";
import {ProductType} from "../types";

export class ProductTypeApi extends EntityApi<ProductType> {
  constructor(token: string) {
    super('ProductType', token);
  }
}
