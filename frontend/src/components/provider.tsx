"use client";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";
import { Header } from "./layout";

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SnackbarProvider
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Header />
        {children}
      </SnackbarProvider>
    </>
  );
};
