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

  static async addNew() {}
}
