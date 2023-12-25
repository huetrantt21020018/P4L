import {BaseApi} from "./base";
import {ResponseData} from "./response";

export class EntityApi<T> extends BaseApi {
  constructor(entityName: string, token: string) {
    super(undefined,  entityName, token);
  }

  getDetail(id: number) : Promise<ResponseData<T>> {
    return this.getJson(id.toString())
  }

  post(entity: T) : Promise<ResponseData<number>> {
    return this.postJson('', entity);
  }

  put(id: number, entity: T) : Promise<ResponseData<T>> {
    return this.putJson(id.toString(), entity);
  }

  delete(id: number) : Promise<ResponseData<any>> {
    return this._delete(id.toString());
  }

  list() : Promise<ResponseData<T[]>> {
    return this.getJson('List');
  }
}
