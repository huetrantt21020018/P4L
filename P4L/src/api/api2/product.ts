import {BaseApi} from "./base";
import {ResponseType} from "./response";
import User from "../../types/user";
import {Product} from "../types";
import {EntityApi} from './entity';

export class ProductApi extends EntityApi<Product> {
  constructor(token: string) {
    super('Product', token);
  }
}
