export default class TaskService {
  static async getAll() {
    const response = await fetch(
      "https://react-practice-a3a21-default-rtdb.firebaseio.com/tasks.json"
    );

    if (!response.ok) {
      throw new Error("Request failed!");
    }

    const data = await response.json();

    return data;
  }

  static async getData(requestConfig) {
    const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      return data;
  }

  static async addNew() {}
}
