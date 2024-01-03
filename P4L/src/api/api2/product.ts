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
  query: string;
}

export class ProductApi extends EntityApi<Product> {
  constructor(token: string) {
    super('Product', token);
  }

  setTag(id: number, tagIds: number[]) : Promise<ResponseData<boolean>> {
    return this.putJson('SetTag/' + id, tagIds);
  }

  find(opt: Partial<FindOptions>) : Promise<ResponseData<Product[]>> {
    return this.postJson('Find', opt);
  }

  getType(type: number) : Promise<ResponseData<Product[]>> {
    return this.getJson('GetByType/' + type);
  }
}
