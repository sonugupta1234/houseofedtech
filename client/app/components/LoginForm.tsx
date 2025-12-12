"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { apiRequest } from "../lib/apiRequest";
import { toast } from "react-toastify";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

type LoginFormValues = {
  email: String;
  password: String;
};

const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const loginUser = await apiRequest("post", "/users/login", values);
      if (loginUser) {
        localStorage.setItem("token", loginUser.token);
        login();
        toast.success("User LoggedIn Successfully!");
        router.push("/tasks");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange }) => (
          <Form className="space-y-4">
            {/* Email */}
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

            {/* Password */}
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

            <p>
              Not yet registered ?{" "}
              <span>
                <strong>
                  <Link href="/auth/register">Register</Link>
                </strong>
              </span>
            </p>

            <button
              type="submit"
              className="w-full mt-4 cursor-pointer bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
