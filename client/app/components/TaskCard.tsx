"use client";

import { useRouter } from "next/navigation";
import { apiRequest } from "../lib/apiRequest";
import { toast } from "react-toastify";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Link from "next/link";
import useAuth from "../hooks/useAuth";

export interface TaskCardProps {
  task: {
    _id: string;
    title: string;
    description: string;
    category: string;
    deadline: string;
    image?: string;
    progress: number;
  };
  getAllTasks: () => void;
}

export default function TaskCard({ task, getAllTasks }: TaskCardProps) {
  const router = useRouter();
  const { isAuth } = useAuth();

  const handleDelete = async () => {
    if (!isAuth) return router.push("/auth/login");
    try {
      const deletetask = await apiRequest("delete", `/tasks/${task._id}`);
      toast.success(deletetask.message);
      getAllTasks();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">{task.title}</h2>

        <div className="w-16 h-16">
          <CircularProgressbar
            value={task.progress}
            text={task.progress === 100 ? "✔" : `${task.progress}%`}
            styles={buildStyles({
              textSize: "28px",
              pathColor: task.progress === 100 ? "#16a34a" : "#facc15",
              textColor: "#000",
              trailColor: "#e5e7eb",
            })}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <div className="mt-3">
          <img
            src={task.image}
            alt={task.title}
            className="w-30 h-30 object-cover rounded-md border"
          />
        </div>
        <div>
          <p className="text-gray-600 mt-2">{task.description}</p>

          <div className="mt-3 text-sm text-gray-500">
            <p>
              <strong>Category:</strong> {task.category}
            </p>
            <p>
              <strong>Deadline:</strong>{" "}
              {new Date(task.deadline).toDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-end gap-3 mt-4">
        <Link
          href={`/tasks/edit/${task._id}`}
          className="px-4 cursor-pointer py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="px-4 py-1.5 cursor-pointer ml-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
