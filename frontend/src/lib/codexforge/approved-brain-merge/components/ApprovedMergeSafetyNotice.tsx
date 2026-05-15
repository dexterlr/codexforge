"use client";

import type { CSSProperties } from "react";

export function ApprovedMergeSafetyNotice() {
  return (
    <section
      style={notice}
      data-codexforge-approved-merge-safety="explicit merge approval required no auto-merge canonical graph schema no source file writes"
    >
      <strong>Approved merge safety</strong>
      <p style={copy}>
        Explicit merge approval required. No auto-merge. The approved path uses
        canonical graph schema, browser-local graph storage, and no source file writes.
      </p>
    </section>
  );
}

const safe: CSSProperties = { overflowWrap: "anywhere", wordBreak: "break-word" };
const notice: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.26)",
  background: "rgba(20,184,166,0.1)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 6,
  minWidth: 0,
  ...safe,
};
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, ...safe };
