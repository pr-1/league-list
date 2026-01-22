const BASE_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "https://www.thesportsdb.com/api/v1/json/3";

class ApiService {
  private static instance = new ApiService();

  static getInstance() {
    return this.instance;
  }

  async get(url: string) {
    const response = await fetch(`${BASE_URL}${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}

export const apiService = ApiService.getInstance();
