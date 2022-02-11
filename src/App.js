import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import { useHttp } from "./hooks/useHttp";

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  const transformAndSetTasks = (taskObj) => {
    const loadedTasks = [];

    for (const taskKey in taskObj) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }

    setTasks(loadedTasks);
  };

  useEffect(() => {
    fetchTasks(
      {
        url: "https://react-practice-a3a21-default-rtdb.firebaseio.com/tasks.json"
      },
      transformAndSetTasks
    );
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
