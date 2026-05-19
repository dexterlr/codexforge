"use client";

import type { CSSProperties } from "react";
import { AiRouterCockpit } from "@/lib/codexforge/ai-router/components/AiRouterCockpit";
import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";

export default function AiRouterPageClient() {
  return (
    <main style={page}>
      <div style={shell}>
        <CodexForgeGlobalNav compact />
        <AiRouterCockpit />
      </div>
    </main>
  );
}

const page: CSSProperties = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top left, rgba(20,184,166,0.12), transparent 34%), linear-gradient(180deg, #020617 0%, #0f172a 100%)",
  padding: 18,
};

const shell: CSSProperties = {
  width: "min(1180px, 100%)",
  margin: "0 auto",
  display: "grid",
  gap: 16,
};
