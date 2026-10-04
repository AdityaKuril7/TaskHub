import { ReactNode } from "react";
import AppShell from "@/app/(main)/app-shell";
import Navbar from "@/components/layout/Navbar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <AppShell>{children}</AppShell>;
    </>
  );
}
