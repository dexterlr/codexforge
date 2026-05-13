"use client";

import type { CSSProperties } from "react";
import { buildCodexForgeFileReactKey } from "../file-search";
import { buildSafeFilePlanChecklist, summarizeSafeFilePlan } from "../file-safe-plan";
import type { CodexForgeSafeFilePlan } from "../file-safe-plan";

export function FileSafePlanPanel({ plan }: { plan: CodexForgeSafeFilePlan }) {
  const checklist = buildSafeFilePlanChecklist(plan);

  return (
    <section data-codexforge-file-safe-plan-panel style={panel}>
      <div style={eyebrow}>Safe plan</div>
      <p style={body}>{summarizeSafeFilePlan(plan)}</p>
      <div style={safetyStrip}>
        <strong>Preview required before any write</strong>
        <span>No file mutation happens from this panel</span>
        <span>Apply must go through guarded tool approval</span>
      </div>
      <div style={tinyBlock}>
        <strong>Goal</strong>
        <span>{plan.goal}</span>
      </div>
      <div style={list}>
        {checklist.slice(0, 8).map((item, index) => (
          <div
            key={buildCodexForgeFileReactKey("safe-plan-check", [plan.targetFilePath, item], index)}
            style={checkItem}
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 10,
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.64,
};

const body: CSSProperties = {
  margin: 0,
  fontSize: 12,
  lineHeight: 1.45,
  opacity: 0.78,
};

const safetyStrip: CSSProperties = {
  border: "1px solid rgba(52,211,153,0.28)",
  background: "rgba(52,211,153,0.10)",
  borderRadius: 8,
  padding: 10,
  display: "grid",
  gap: 5,
  fontSize: 12,
  lineHeight: 1.4,
};

const tinyBlock: CSSProperties = {
  borderTop: "1px solid rgba(255,255,255,0.08)",
  paddingTop: 8,
  display: "grid",
  gap: 4,
  fontSize: 11,
  lineHeight: 1.4,
};

const list: CSSProperties = {
  display: "grid",
  gap: 7,
};

const checkItem: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.18)",
  borderRadius: 8,
  padding: 9,
  fontSize: 11,
  lineHeight: 1.4,
};
