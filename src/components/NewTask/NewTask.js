import React, { useCallback } from "react";
import TaskService from "../../api/TaskService";
import { useFetch } from "../../hooks/useFetch";
import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { onAddTask } = props

  const updateTask = useCallback((taskText) => {
    const generatedId = taskText.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    onAddTask(createdTask);
  }, [onAddTask])
  
  const enterTaskHandler = useCallback(async (taskText) => {
    await TaskService.addNew(taskText)
    updateTask(taskText)
  }, [updateTask]);

  const [isLoading, error, what] = useFetch(enterTaskHandler);

  return (
    <Section>
      <TaskForm onEnterTask={what} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
