"use client";

import type { CSSProperties } from "react";
import { buildCodexForgeFileReactKey } from "../file-search";
import {
  summarizeFileSafeNextAction,
  type CodexForgeFileSafeNextAction,
} from "../file-safe-next-action";

export function FileSafeNextActionPanel({
  action,
  queue,
}: {
  action: CodexForgeFileSafeNextAction;
  queue: CodexForgeFileSafeNextAction[];
}) {
  return (
    <section data-codexforge-file-safe-next-action-card style={panel}>
      <div style={eyebrow}>Safe next action</div>
      <div style={heroAction}>
        <span style={statePill(action.state)}>{action.state}</span>
        <strong style={safeWrap}>{action.label}</strong>
        <span style={detail}>{summarizeFileSafeNextAction(action)}</span>
      </div>
      <div style={queueGrid}>
        {queue.slice(0, 4).map((item, index) => (
          <div
            key={buildCodexForgeFileReactKey("safe-next-action", [item.id, item.target ?? ""], index)}
            style={queueItem(item.state)}
          >
            <span style={miniState}>{item.state}</span>
            <strong style={safeWrap}>{item.label}</strong>
            <span style={detail}>{item.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const safeWrap: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const panel: CSSProperties = {
  border: "1px solid rgba(52,211,153,0.18)",
  background:
    "linear-gradient(145deg, rgba(6,78,59,0.34), rgba(2,6,23,0.76)), radial-gradient(circle at 0% 0%, rgba(52,211,153,0.14), transparent 34%)",
  borderRadius: 8,
  padding: 14,
  display: "grid",
  gap: 10,
  minWidth: 0,
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.68,
};

const heroAction: CSSProperties = {
  border: "1px solid rgba(52,211,153,0.24)",
  background: "rgba(0,0,0,0.22)",
  borderRadius: 8,
  padding: 11,
  display: "grid",
  gap: 6,
  minWidth: 0,
};

function statePill(state: string): CSSProperties {
  return {
    border:
      state === "blocked"
        ? "1px solid rgba(248,113,113,0.34)"
        : state === "approval-required"
          ? "1px solid rgba(251,191,36,0.34)"
          : "1px solid rgba(52,211,153,0.30)",
    background:
      state === "blocked"
        ? "rgba(248,113,113,0.10)"
        : state === "approval-required"
          ? "rgba(251,191,36,0.10)"
          : "rgba(52,211,153,0.12)",
    borderRadius: 8,
    padding: "5px 7px",
    width: "fit-content",
    fontSize: 10,
    fontWeight: 900,
    textTransform: "uppercase",
    ...safeWrap,
  };
}

const detail: CSSProperties = {
  fontSize: 12,
  lineHeight: 1.45,
  opacity: 0.78,
  ...safeWrap,
};

const queueGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 170px), 1fr))",
  gap: 8,
  minWidth: 0,
};

function queueItem(state: string): CSSProperties {
  return {
    border:
      state === "blocked"
        ? "1px solid rgba(248,113,113,0.24)"
        : "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.18)",
    borderRadius: 8,
    padding: 10,
    display: "grid",
    gap: 5,
    minWidth: 0,
  };
}

const miniState: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.58,
  ...safeWrap,
};
