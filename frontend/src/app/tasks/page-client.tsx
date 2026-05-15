"use client";

import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";
import { TaskAutopilotPanel } from "@/lib/codexforge/task-autopilot/components";

export default function TasksPageClient() {
  return (
    <>
      <div style={{ background: "#020617", padding: "18px min(4vw, 44px) 0" }}>
        <CodexForgeGlobalNav compact />
      </div>
      <TaskAutopilotPanel />
    </>
  );
}
