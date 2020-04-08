export interface IWsDataSource {
  onOpen(event: Event): void;
  onClose(event: Event): void;
  onMessage(event: Event): void;
  onError(event: Event): void;
  send(data: string): void;
}

export class WsDataSource implements IWsDataSource {
  protected socket: WebSocket;
  protected updateState: (event?: MessageEvent) => void;

  public constructor(uri: string, updateState: (event?: MessageEvent) => void) {
    this.socket = new WebSocket(uri);
    this.updateState = updateState;

    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onclose = this.onClose.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onerror = this.onError.bind(this);
  }

  public onOpen(): void {
    // ...
  }

  public onClose(): void {
    this.socket = null;

    typeof this.updateState === 'function' && this.updateState();
  }

  public onMessage(event: MessageEvent): void {
    typeof this.updateState === 'function' && this.updateState(event);
  }

  public onError(event: Event): void {
    this.socket.readyState === 1 && console.info(`WS error: ${event.type}`);
  }

  public send(data: string): void {
    this.socket.send(data);
  }
}
