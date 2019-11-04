import { HttpDataSource, IHttpDataSource } from '..';

export class HttpService {
  protected http: IHttpDataSource;

  public constructor(token?: string) {
    this.http = new HttpDataSource(token || '');
  }
}
