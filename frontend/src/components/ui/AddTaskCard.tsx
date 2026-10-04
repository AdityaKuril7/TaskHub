import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";
import { ICreateTask } from "@/types/task.types";
import { LucideX, CalendarClock, Sparkles } from "lucide-react";
import { useUiStore } from "@/store/useUiStore";
import { useCreateTask } from "@/hooks/task/use-create-task";
import { queryClient } from "@/lib/query-client";
import * as chrono from "chrono-node";

export default function AddTaskCard() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isAddNote, setIsAddNote] = useState(false);
  const [detectedDate, setDetectedDate] = useState<Date | null>(null);
  const [cleanTitle, setCleanTitle] = useState("");

  const handleClose = useUiStore((state) => state.hideAddCard);
  const createTaskMutation = useCreateTask();

  const initialForm: ICreateTask = {
    title: "",
    note: "",
    due_date: null,
    priority: "MEDIUM",
  };

  const [form, setForm] = useState<ICreateTask>(initialForm);

  const handleChange = (key: keyof ICreateTask, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Detect date and time while typing
  const handleTitleChange = (value: string) => {
    handleChange("title", value);

    const results = chrono.parse(value, new Date(), {
      forwardDate: true,
    });

    if (results.length > 0) {
      const result = results[0];
      const date = result.start.date();

      setDetectedDate(date);

      // Remove only the detected date/time phrase from title
      const titleWithoutDate = (
        value.slice(0, result.index) +
        value.slice(result.index + result.text.length)
      )
        .replace(/\s+/g, " ")
        .trim();

      setCleanTitle(titleWithoutDate);
    } else {
      setDetectedDate(null);
      setCleanTitle(value);
    }
  };

  const handleSubmit = () => {
    const taskData = {
      ...form,
      title: cleanTitle || form.title,
      due_date: detectedDate ?? form.due_date ?? null,
    };

    createTaskMutation.mutate(taskData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });
        handleClose();
      },
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="h-screen w-screen bg-black/60 absolute inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-md p-6 gap-5 flex flex-col bg-white rounded-xl shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">Add Task</p>

          <Button onClick={handleClose} variant="destructive" size="icon">
            <LucideX size={18} />
          </Button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label>Task title</Label>
            <Input
              ref={inputRef}
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              onKeyUp={(e) => {
                e.key === "Enter" && handleSubmit();
              }}
              className="h-11"
              placeholder="e.g. Complete assignment tomorrow at 5 PM"
            />
          </div>

          {/* Detected Date */}
          <AnimatePresence>
            {detectedDate && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 rounded-lg border border-blue-200 bg-blue-50 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Sparkles size={16} />
                    <span className="text-sm font-semibold">
                      Date & time detected
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-800">
                    <CalendarClock size={19} />

                    <div>
                      <p className="font-semibold text-sm">
                        {detectedDate.toLocaleDateString(undefined, {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>

                      <p className="text-xs text-gray-500">
                        {detectedDate.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-blue-600">
                    Date and time will be saved separately from your task title.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Priority and Manual Date */}
          <div className="flex items-center justify-between gap-3">
            <select
              value={form.priority || "MEDIUM"}
              onChange={(e) => {
                handleChange("priority", e.target.value);
              }}
              className="border bg-gray-100 p-3 rounded-lg"
            >
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>

            <Input
              className="h-11"
              type="date"
              value={
                form.due_date ? form.due_date.toISOString().split("T")[0] : ""
              }
              onChange={(e) => {
                const date = e.target.value
                  ? new Date(`${e.target.value}T00:00:00`)
                  : null;

                handleChange("due_date", date);
                setDetectedDate(null);
              }}
            />
          </div>

          {/* Note */}
          <Label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isAddNote}
              onChange={(e) => setIsAddNote(e.target.checked)}
            />
            Add Note
          </Label>

          <AnimatePresence>
            {isAddNote && (
              <motion.textarea
                value={form.note || ""}
                onChange={(e) => handleChange("note", e.target.value)}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 130 }}
                exit={{ opacity: 0, height: 0 }}
                className="border bg-gray-100 rounded-lg resize-none p-3"
                placeholder="Write your note..."
              />
            )}
          </AnimatePresence>
        </div>

        {/* Submit */}
        <Button
          className="w-full h-11"
          onClick={handleSubmit}
          disabled={createTaskMutation.isPending || !cleanTitle.trim()}
        >
          {createTaskMutation.isPending ? "Adding..." : "Add Task"}
        </Button>
      </motion.div>
    </div>
  );
}
