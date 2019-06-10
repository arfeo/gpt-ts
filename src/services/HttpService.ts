import { HttpDataSource, IHttpDataSource } from '..';

export class HttpService {
  protected http: IHttpDataSource;

  constructor(token?: string) {
    this.http = new HttpDataSource(token || '');
  }
}
