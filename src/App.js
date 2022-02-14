import React, { useCallback, useEffect, useMemo, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import { useHttp2 } from "./hooks/useHttp2";

function App() {
  const [tasks, setTasks] = useState([]);

  const requestConfig = useMemo(() => {
    return {
      url: "https://react-practice-a3a21-default-rtdb.firebaseio.com/tasks.json"
    };
  }, []);

  const transformAndSetTasks = useCallback((taskObj) => {
    const loadedTasks = [];

    for (const taskKey in taskObj) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);

  const {
    isLoading,
    error,
    sendRequest: fetchTasks
  } = useHttp2(requestConfig, transformAndSetTasks);

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
