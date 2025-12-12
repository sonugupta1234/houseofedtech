"use client";

import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("../../components/Navbar"));
const TaskForm = dynamic(() => import("../../components/TaskForm"));

export default function CreateTaskPage() {
  return (
    <>
      <Navbar />
      <TaskForm mode="create" />
    </>
  );
}
