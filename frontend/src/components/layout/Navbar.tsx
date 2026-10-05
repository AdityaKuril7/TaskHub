"use client";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/useUiStore";

export default function Navbar() {
  const showAddCard: () => void = useUiStore((state) => state.showAddCard);
  const hideAddCard: () => void = useUiStore((state) => state.hideAddCard);
  const isAddCardOpen = useUiStore((state) => state.isShowAddCard);

  return (
    <div
      className={"w-screen h-20 border-b flex items-center justify-between p-5"}
    >
      <div className={""}>
        <p className={"font-bold text-xl text-blue-600"}>TaskHub</p>
      </div>

      <div className={"flex items-center gap-4"}>
        <Button
          // className={
          //   "px-5 py-2 bg-primary text-primary-foreground font-bold rounded-lg"
          // }
          variant={isAddCardOpen ? "destructive" : "default"}
          onClick={isAddCardOpen ? hideAddCard : showAddCard}
        >
          {isAddCardOpen ? "Close" : "Add Task"}
        </Button>
      </div>
    </div>
  );
}
