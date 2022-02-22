import { useFetch } from "../../hooks/useFetch";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const FetchFunc = async (requestConfig, applyDataFn) => {

     const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      applyDataFn(data);
    }

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTask } = useFetch(FetchFunc);
  console.log(typeof sendTask);  // undefined
  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendTask(
      {
        url: "https://react-practice-a3a21-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json"
        }
      },
      createTask.bind(null, taskText)
    );
    console.log(typeof sendTask);  // undefined
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
