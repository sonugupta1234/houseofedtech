"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LuLoader } from "react-icons/lu";
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

      <div className="flex flex-col items-center  mt-10">
        <div className="w-full max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center  mb-6">
            <button
              onClick={handleNewTasks}
              className="bg-red-600 text-white rounded-full px-6 py-2 cursor-pointer"
            >
              Create a new Task
            </button>
          </div>

          <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">
            Your Tasks
          </h1>

          {loading ? (
            <div className="w-full   text-center  my-10">
              <LuLoader className="w-8 m-auto h-8 text-gray-700" />
              <strong className="mt-4">Loading tasks...</strong>
            </div>
          ) : tasks.length > 0 ? (
            <div className="grid grid-cols-1   sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tasks.map((task: Task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  getAllTasks={getAllTasks}
                />
              ))}
            </div>
          ) : (
            <p className="mt-20 text-center">No tasks yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
