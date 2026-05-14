"use client";

import type { CSSProperties } from "react";

export function MemoryReviewSafetyNotice() {
  return (
    <section style={panel} data-codexforge-memory-review-safety-notice="MemoryReviewSafetyNotice renders review required no auto-promotion no direct graph mutation">
      <span style={eyebrow}>Safety notice</span>
      <h2 style={title}>Review required</h2>
      <p style={copy}>
        Memory review is local-first and deterministic. There is no auto-promotion, no direct graph mutation,
        no source file mutation, and no command execution. Approved candidates can only produce a memory.promoted
        preview for future persistence work.
      </p>
    </section>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(248,113,113,0.18)", background: "linear-gradient(145deg, rgba(127,29,29,0.2), rgba(15,23,42,0.74))", borderRadius: 8, padding: 16, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fca5a5", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { margin: 0, fontSize: 20, ...safeText };
const copy: CSSProperties = { margin: 0, color: "#fee2e2", fontSize: 13, lineHeight: 1.6, ...safeText };
