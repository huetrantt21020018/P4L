import {Stock} from "../types";
import {EntityApi} from "./entity";

export class StockApi extends EntityApi<Stock> {
  constructor(token: string) {
    super('Stock', token);
  }

  postStock(s: { description: string, count: number, productId: number }) {
    return this.post(s as Stock);
  }
}
