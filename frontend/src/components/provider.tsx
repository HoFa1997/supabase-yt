"use client";
import { supabaseClient } from "@/api/config";
import { useRouter } from "next/navigation";
import { SnackbarProvider } from "notistack";
import { ReactNode, useEffect } from "react";

export const Provider = ({ children }: { children: ReactNode }) => {
  const { replace } = useRouter();

  useEffect(() => {
    const fetchSessionData = async () => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      if (!session) {
        replace("/login");
      }
    };
    fetchSessionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
