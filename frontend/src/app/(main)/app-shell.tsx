"use client";
import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { useUiStore } from "@/store/useUiStore";
import AddTaskCard from "@/components/ui/AddTaskCard";

export default function AppShell({ children }: { children: ReactNode }) {
  const isShowAddCard = useUiStore((state) => state.isShowAddCard);

  return (
    <main className="flex flex-1 overflow-hidden">
      <Sidebar />
      {isShowAddCard && <AddTaskCard />}
      {children}
    </main>
  );
}
