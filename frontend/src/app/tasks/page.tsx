import type { Metadata } from "next";
import TasksPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Task Memory Autopilot",
  description:
    "CodexForge review-gated task suggestions from recalled memory, file risk, and mission state.",
};

export default function TasksPage() {
  return <TasksPageClient />;
}
