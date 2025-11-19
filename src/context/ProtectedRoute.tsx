"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner, Center } from "@chakra-ui/react";
import { useAuth } from "./AuthProvider";
import { UserRole } from "@/interfaces/common";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: UserRole[];
}

export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/auth");
    }
  }, [user, router]);

  if (user && roles && !roles.includes(user.role)) {
    return (
      <Center mt={10}>
        <h2>Acesso Negado</h2>
      </Center>
    );
  }

  if (user === null) {
    return (
      <Center mt={10}>
        <Spinner size="lg" />
      </Center>
    );
  }

  return <>{children}</>;
};
