import type { Metadata } from "next";
import TasksPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Task Memory Autopilot and Reviewed Task Activation",
  description:
    "CodexForge review-gated task suggestions and reviewed task activation requests, plan previews, and /ai handoffs.",
};

export default function TasksPage() {
  return <TasksPageClient />;
}
