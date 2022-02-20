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

  static async addNew(taskText) {
    const response = await fetch(
      "https://react-practice-a3a21-default-rtdb.firebaseio.com/tasks.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:  JSON.stringify( {text: taskText} ),
    });

    if (!response.ok) {
      throw new Error("Request failed!");
    }
  }
}
