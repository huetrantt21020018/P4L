import {Cart} from "../types";
import {EntityApi} from "./entity";
import {ResponseData} from "./response";

export class CartApi extends EntityApi<Cart> {
  constructor(token: string) {
    super('Cart', token);
  }

  postCart(entity: { productId: number, count: number, variants: { variantId: number,  variantValueId: number }[] }): Promise<ResponseData<number>> {
    return super.post(entity as any);
  }
}
