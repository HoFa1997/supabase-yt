"use client";
import { supabaseClient } from "@/api/config";
import { useRouter } from "next/navigation";
import { SnackbarProvider } from "notistack";
import { ReactNode, useEffect } from "react";

export const Provider = ({ children }: { children: ReactNode }) => {
  const { replace } = useRouter();

  return (
    <>
      <SnackbarProvider
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        {children}
      </SnackbarProvider>
    </>
  );
};
