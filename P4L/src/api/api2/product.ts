import {ResponseData} from "./response";
import {Product} from "../types";
import {EntityApi} from './entity';

interface FindOptions {
  productType: number;
  productTags: number[];
  minPrice: number;
  maxPrice: number;
  growingSeasonMin: number;
  growingSeasonMax: number;
}

export class ProductApi extends EntityApi<Product> {
  constructor(token: string) {
    super('Product', token);
  }

  find(opt: Partial<FindOptions>) : Promise<ResponseData<Product[]>> {
    return this.postJson('Find', opt);
  }
}
