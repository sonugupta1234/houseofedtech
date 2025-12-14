"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { apiRequest } from "../lib/apiRequest";
import ProtectedRoute from "./ProtectedRoutes";

export interface TaskFormValues {
  title: string;
  description: string;
  category: string;
  deadline: string;
  image: string;
  progress: number;
}

export interface TaskFormProps {
  mode: "create" | "edit";
  task?: TaskFormValues | null;
  id?: string;
}

const TaskSchema = Yup.object().shape({
  title: Yup.string().min(4).required("Title is required"),
  description: Yup.string().min(5).required("Description is required"),
  category: Yup.string().required("Category is required"),
  deadline: Yup.date().required("Deadline is required"),
  progress: Yup.number().min(0).max(100),
  image: Yup.string().when("$mode", {
    is: "create",
    then: (schema) => schema.required("Image is required"),
    otherwise: (schema) => schema.nullable(),
  }),
});

const TaskForm = ({ mode, task, id }: TaskFormProps) => {
  const router = useRouter();

  const initialValues: TaskFormValues = task
    ? {
        ...task,
        deadline: task.deadline ? task.deadline.split("T")[0] : "",
      }
    : {
        title: "",
        description: "",
        category: "",
        deadline: "",
        image: "",
        progress: 0,
      };

  const handleSubmit = async (values: TaskFormValues) => {
    try {
      if (mode === "create") {
        await apiRequest("post", "/tasks", values);
        toast.success("Task created successfully!");
      } else {
        await apiRequest("put", `/tasks/${id}`, values);
        toast.success("Task updated successfully!");
      }

      router.push("/tasks");
    } catch (err) {
      toast.error("Failed to save task");
    }
  };
  return (
    <ProtectedRoute>
      <div className="max-w-xl mx-auto py-10 shadow-xl/30">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {mode === "edit" ? "Edit Task" : "Create New Task"}
        </h1>

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={TaskSchema}
          onSubmit={handleSubmit}
          context={{ mode }}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4 p-6 bg-white rounded-lg shadow">
              {/* Title */}
              <div>
                <label className="block font-medium mb-1">
                  Task Title <span className="text-red-600">*</span>
                </label>
                <Field
                  name="title"
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                />
                <ErrorMessage
                  name="title"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-medium mb-1">
                  Description <span className="text-red-600">*</span>
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows={3}
                  className="w-full border px-3 py-2 rounded"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Image Upload */}
              {/* Image Upload */}
              <div>
                <label className="block font-medium mb-1">
                  Image <span className="text-red-600">*</span>
                </label>

                {mode === "edit" && task?.image && (
                  <img
                    src={task.image}
                    alt="Task"
                    className="w-32 h-32 object-cover rounded mb-3 border"
                  />
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="w-full border px-3 py-2 rounded"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    // Compress function
                    const compressImage = (file: File): Promise<string> => {
                      return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);

                        reader.onload = (event) => {
                          const img = new Image();
                          img.src = event.target?.result as string;

                          img.onload = () => {
                            const canvas = document.createElement("canvas");
                            const ctx = canvas.getContext("2d")!;

                            const MAX_WIDTH = 600;
                            const scaleSize = MAX_WIDTH / img.width;

                            canvas.width = MAX_WIDTH;
                            canvas.height = img.height * scaleSize;

                            ctx.drawImage(
                              img,
                              0,
                              0,
                              canvas.width,
                              canvas.height
                            );

                            // Compress to JPEG (70% quality)
                            const compressedDataUrl = canvas.toDataURL(
                              "image/jpeg",
                              0.7
                            );

                            resolve(compressedDataUrl);
                          };
                        };
                      });
                    };

                    const compressed = await compressImage(file);
                    setFieldValue("image", compressed);
                  }}
                />

                <ErrorMessage
                  name="image"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block font-medium mb-1">
                  Category <span className="text-red-600">*</span>
                </label>
                <Field
                  as="select"
                  name="category"
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select Category</option>
                  <option value="Learning">Learning</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                </Field>
                <ErrorMessage
                  name="category"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Deadline */}
              <div>
                <label className="block font-medium mb-1">
                  Deadline <span className="text-red-600">*</span>
                </label>
                <Field
                  name="deadline"
                  type="date"
                  className="w-full border px-3 py-2 rounded"
                />
                <ErrorMessage
                  name="deadline"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Progress */}
              <div>
                <label className="block font-medium mb-1">Progress (%)</label>
                <Field
                  name="progress"
                  type="number"
                  className="w-full border px-3 py-2 rounded"
                />
                <ErrorMessage
                  name="progress"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer bg-blue-600 mt-6 text-white py-2 rounded hover:bg-blue-700"
              >
                {mode === "edit" ? "Update Task" : "Create Task"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </ProtectedRoute>
  );
};

export default TaskForm;
