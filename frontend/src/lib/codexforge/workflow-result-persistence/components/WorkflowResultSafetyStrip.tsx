"use client";

import type { CSSProperties } from "react";
import { wrPill } from "./WorkflowResultStyles";

export function WorkflowResultSafetyStrip() {
  return (
    <div style={strip} data-codexforge-workflow-result-safety-strip="WorkflowResultSafetyStrip renders no auto-promotion no Brain auto-mutation no auto-persist into Brain review required preserve latest-message authority no command execution buttons no file write buttons no memory auto-promotion">
      {["No auto-promotion", "No Brain auto-mutation", "Review required", "Preserve latest-message authority", "Copy-only handoff"].map((item) => (
        <span key={`workflow-result-safety-${item.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} style={wrPill}>{item}</span>
      ))}
    </div>
  );
}

const strip: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
