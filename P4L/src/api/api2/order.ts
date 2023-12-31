import {EntityApi} from "./entity";
import {Order} from "../types";

export class OrderApi extends EntityApi<Order> {
  constructor(token: string) {
    super('Order', token);
  }

  createOrder(order : {
    "country": string,
    "province": string,
    "city": string,
    "ward": string,
    "street": string,
    "phoneNumber": string,
    "userPaymentMethodId": number,
    "cart_id": number[],
    "email": string,
    "extra": string
  }) {
    return this.post(order as any as Order);
  }
}
