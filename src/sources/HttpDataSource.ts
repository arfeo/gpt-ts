export class HttpDataSource {
  token: string;

  constructor(token?: string) {
    this.token = token || '';
  }

  get(url: string): Promise<any> {
    return this.send(encodeURI(url), 'GET');
  }

  post(url: string, data = {}): Promise<any> {
    return this.send(encodeURI(url), 'POST', data);
  }

  put(url: string, data = {}): Promise<any> {
    return this.send(encodeURI(url), 'PUT', data);
  }

  remove(url: string, data = {}): Promise<any> {
    return this.send(encodeURI(url), 'DELETE', data);
  }

  private send(url: string, method = 'POST', data?: any): Promise<any> {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: this.token,
      },
      body: data && JSON.stringify(data),
    }).then(this.response);
  }

  private response = async (response: any): Promise<any> => {
    const raw: string = await response.text();
    const parsed: any = raw ? JSON.parse(raw) : { success: response.ok };

    return response.ok ? Promise.resolve(parsed) : Promise.reject(parsed);
  }
}
