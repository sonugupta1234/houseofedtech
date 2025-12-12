"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { apiRequest } from "../lib/apiRequest";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password required"),
});

type RegisterFormValues = {
  name: String;
  email: String;
  password: String;
};

const RegisterForm = () => {
  const router = useRouter();

  const initialValues: RegisterFormValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      const newUser = await apiRequest("post", "/users/register", values);
      if (newUser) {
        toast.success("User Registered Successfully!");
        router.push("/auth/login");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Register</h1>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange }) => (
          <Form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">
                Name<span className="text-red-600">*</span>
              </label>
              <Field
                name="name"
                type="string"
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter your full name"
                onChange={handleChange}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Email<span className="text-red-600">*</span>
              </label>
              <Field
                name="email"
                type="email"
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter your email"
                onChange={handleChange}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Password<span className="text-red-600">*</span>
              </label>
              <Field
                name="password"
                type="password"
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter your password"
                onChange={handleChange}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
