export default class DataProvider {
  constructor(baseUrl, getToken) {
    this.baseUrl = baseUrl;
    this.getToken = getToken;
  }

  async request(endpoint, method, data) {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  get(endpoint) {
    return this.request(endpoint, "GET");
  }

  post(endpoint, data) {
    return this.request(endpoint, "POST", data);
  }

  put(endpoint, data) {
    return this.request(endpoint, "PUT", data);
  }

  delete(endpoint) {
    return this.request(endpoint, "DELETE");
  }
}
