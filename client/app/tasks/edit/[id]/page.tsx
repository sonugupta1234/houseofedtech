"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { apiRequest } from "../../../lib/apiRequest";
import { useEffect, useState } from "react";
import { TaskFormProps, TaskFormValues } from "../../../components/TaskForm";

const Navbar = dynamic(() => import("../../../components/Navbar"));

const TaskForm = dynamic<TaskFormProps>(
  () => import("../../../components/TaskForm"),
);

export default function EditTaskPage() {
  const { id } = useParams();

  const [task, setTask] = useState<TaskFormValues | null>(null);

  const getSingleTask = async () => {
    try {
      const response = await apiRequest("get", `/tasks/${id}`);
      setTask(response);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  useEffect(() => {
    getSingleTask();
  }, []);

  return (
    <>
      <Navbar />
      <TaskForm mode="edit" id={id as string} task={task} />
    </>
  );
}
