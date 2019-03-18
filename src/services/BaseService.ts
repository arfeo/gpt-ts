import { HttpDataSource } from '..';

export class BaseService {
  protected http: HttpDataSource;

  constructor(token?: string) {
    this.http = new HttpDataSource(token || '');
  }
}
