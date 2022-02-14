import React, { useCallback, useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import { useFetch } from "./hooks/useFetch";
import TaskService from "./api/TaskService";

function App() {
  const [tasks, setTasks] = useState([]);

  const transformAndSetTasks = useCallback((taskObj) => {
    const loadedTasks = [];

    for (const taskKey in taskObj) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);

  const loadTasks = useCallback(async () => {
    const response = await TaskService.getAll();
    transformAndSetTasks(response);
  }, [transformAndSetTasks]);

  const [isLoading, error, fetchTasks] = useFetch(loadTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

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
