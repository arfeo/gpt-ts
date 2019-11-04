import { WsDataSource, IWsDataSource } from '..';

export class WsService {
  protected ws: IWsDataSource;

  public constructor(uri: string, updateState: (event?: MessageEvent) => void) {
    this.ws = new WsDataSource(uri, updateState);
  }
}
