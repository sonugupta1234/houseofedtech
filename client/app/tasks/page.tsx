"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { apiRequest } from "../lib/apiRequest";
import { TaskCardProps } from "../components/TaskCard";

const TaskCard = dynamic<TaskCardProps>(() => import("../components/TaskCard"));
interface Task {
  _id: string;
  title: string;
  description: string;
  category: string;
  deadline: string;
  image?: string;
  progress: number;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const getAllTasks = async () => {
    try {
      const allTask = await apiRequest("get", "/tasks");
      setTasks(allTask);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const handleNewTasks = () => {
    router.push("/tasks/create");
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col justify-start items-center mt-10">
        <div className="w-full p-6 rounded-lg text-center">
          <button
            onClick={handleNewTasks}
            className="bg-red-600 text-white rounded-full px-4 py-2 mb-4 cursor-pointer"
          >
            Create a new Task
          </button>

          <h1 className="text-2xl font-bold mb-6 mt-6">Your Tasks</h1>

          {loading ? (
            <div className="w-full text-center my-10">
              <p>Loading tasks...</p>
            </div>
          ) : tasks.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              {tasks.map((task: Task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  getAllTasks={getAllTasks}
                />
              ))}
            </div>
          ) : (
            <p className="mt-20">No tasks yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
