"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";

type SingleUser = {
  id: number;
  name: string;
  email: string;
  token: string;
};

export default function Navbar() {
  const [hover, setHover] = useState<Boolean | null>(false);
  const { isAuth, logout } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<SingleUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser: SingleUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        localStorage.removeItem("user");
        setUser(null);
      }
    }
  }, []);

  const handlelogout = () => {
    logout();
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="bg-sky-500/100  px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl px-2 py-1 rounded-md font-bold text-white"
        >
          SmartTasks
        </Link>

        <div
          className="relative"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* Profile Icon */}
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200">
            <CgProfile className="w-6 h-6 text-gray-700" />
          </div>

          {/* Dropdown */}
          {hover && (
            <div
              className="
              absolute right-0 top-full w-40 bg-white shadow-lg 
              rounded-md border p-2 
              transition-all duration-200 ease-out"
            >
              {isAuth ? (
                <div>
                  <p>
                    Hi, <strong className="ml-2">{user?.name}</strong>
                  </p>

                  <button
                    onClick={handlelogout}
                    className="rounded-md cursor-pointer bg-red-600 ml-10 mt-4 text-white px-2 py-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div>
                  <Link
                    href="/auth/login"
                    className="block bg-red-500 text-white px-3 py-2 rounded hover:bg-red-400 text-gray-700"
                  >
                    Login
                  </Link>

                  <Link
                    href="/auth/register"
                    className="block bg-red-500 text-white px-3 py-2 mt-2 rounded hover:bg-red-400 text-gray-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
