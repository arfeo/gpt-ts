export class HttpDataSource {
  get(url: string, token = ''): Promise<any> {
    return this.send(encodeURI(url), 'GET', {}, token);
  }

  post(url: string, data = {}, token = ''): Promise<any> {
    return this.send(encodeURI(url), 'POST', data, token);
  }

  put(url: string, data = {}, token = ''): Promise<any> {
    return this.send(encodeURI(url), 'PUT', data, token);
  }

  remove(url: string, data = {}, token = ''): Promise<any> {
    return this.send(encodeURI(url), 'DELETE', data, token);
  }

  private send(url: string, method = 'POST', data?: any, token?: string): Promise<any> {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: token,
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
