"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth, loading } = useAuth();
  const router = useRouter();

  console.log(loading, isAuth, "auth");
  useEffect(() => {
    if (!loading && !isAuth) {
      router.replace("/auth/login");
    }
  }, [isAuth, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}
