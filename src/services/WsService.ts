interface IWsService {
  onOpen(event: Event): void;
  onClose(event: Event): void;
  onMessage(event: Event): void;
  onError(event: Event): void;
  send(data: string): void;
}

class WsService implements IWsService {
  protected socket: WebSocket;
  protected updateState: (event?: MessageEvent) => void;

  constructor(uri: string, updateState: (event?: MessageEvent) => void) {
    this.socket = new WebSocket(uri);
    this.updateState = updateState;

    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onclose = this.onClose.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onerror = this.onError.bind(this);
  }

  onOpen() {
    // ...
  }

  onClose() {
    this.socket = null;

    typeof this.updateState === 'function' && this.updateState();
  }

  onMessage(event: MessageEvent) {
    typeof this.updateState === 'function' && this.updateState(event);
  }

  onError(event: Event) {
    this.socket.readyState === 1 && console.error(`WS error: ${event.type}`);
  }

  send(data: string) {
    this.socket.send(data);
  }
}

export { WsService, IWsService };
