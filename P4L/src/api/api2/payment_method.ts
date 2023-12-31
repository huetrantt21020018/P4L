import {EntityApi} from "./entity";
import {PaymentMethod} from "../types";

export class PaymentMethodApi extends EntityApi<PaymentMethod> {
  constructor(token: string) {
    super('UserPaymentMethod', token);
  }
}
