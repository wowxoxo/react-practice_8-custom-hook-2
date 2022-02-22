import React, { useCallback } from "react";
import TaskService from "../../api/TaskService";
import { useFetch } from "../../hooks/useFetch";
import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { onAddTask } = props

  const createTask = useCallback((taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    onAddTask(createdTask);
  }, [onAddTask])
  
  const sendRequestCreateTask = useCallback(async (taskText) => {
    const response = await TaskService.addNew(taskText)
    createTask(taskText, response)
  }, [createTask]);

  const [isLoading, error, enterTaskHandler] = useFetch(sendRequestCreateTask);

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
