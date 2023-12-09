import {ResponseType} from "./response";

export class BaseApi {
  private readonly baseApi: string;
  private readonly token: string;
  constructor(baseApi: string = 'http://db2.bedge.space:5000/api', subRoute = '', token = '') {
    this.baseApi = baseApi + '/' + subRoute;
    this.token = token;
  }

  getJson(endpoint: string) : Promise<ResponseType<any>> {
    return fetch(this.baseApi + '/' + endpoint, {
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    }).then(res => res.json())
  }

  postJson(endpoint: string, obj: any) : Promise<ResponseType<any>> {
    return fetch(this.baseApi + '/' + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      },
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
  }

  putJson(endpoint: string, obj: any) : Promise<ResponseType<any>> {
    return fetch(this.baseApi + '/' + endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      },
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
  }

  _delete(endpoint: string) : Promise<ResponseType<any>> {
    return fetch(this.baseApi + '/' + endpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }
    })
      .then(res => res.json())
  }
}