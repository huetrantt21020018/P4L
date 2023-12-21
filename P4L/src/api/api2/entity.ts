import {BaseApi} from "./base";
import {ResponseType} from "./response";

export class EntityApi<T> extends BaseApi {
  constructor(entityName: string, token: string) {
    super(undefined,  entityName, token);
  }

  getDetail(id: number) : Promise<ResponseType<T>> {
    return this.getJson(id.toString())
  }

  post(entity: T) : Promise<ResponseType<number>> {
    return this.postJson('', entity);
  }

  put(id: number, entity: T) : Promise<ResponseType<T>> {
    return this.putJson(id.toString(), entity);
  }

  delete(id: number) : Promise<ResponseType<any>> {
    return this._delete(id.toString());
  }

  list() : Promise<ResponseType<T[]>> {
    return this.getJson('List');
  }
}
