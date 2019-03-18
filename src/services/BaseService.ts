import { HttpDataSource, IHttpDataSource } from '..';

export class BaseService {
  protected http: IHttpDataSource;

  constructor(token?: string) {
    this.http = new HttpDataSource(token || '');
  }
}
